#!/bin/bash
# 必要な環境変数を設定
KEY=$KEY
HOST=$HOST
USERNAME=$USERNAME
PORT=$PORT

# SSHキーのセットアップ
mkdir -p ~/.ssh
echo "$KEY" | tr -d '\r' > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key
ssh-keyscan -p "$PORT" "$HOST" >> ~/.ssh/known_hosts

# リモートホストへのDockerイメージ転送
podman build -t todoapp-server .
podman save todoapp-server | gzip | ssh -i ~/.ssh/deploy_key -o BatchMode=yes ${USERNAME}@${HOST} -p ${PORT} 'gunzip | podman load'

# リモートでのコンテナ操作
ssh -i ~/.ssh/deploy_key -p $PORT $USERNAME@$HOST << EOF
  cd todoapp-server
  podman exec -it todoapp-server git pull 
  podman exec -it todoapp-server yarn migration:run
EOF

# デプロイメントの成功確認
if [ $? -eq 0 ]; then
    echo "Deployment succeeded."
else
    echo "Deployment failed."
    exit 1
fi