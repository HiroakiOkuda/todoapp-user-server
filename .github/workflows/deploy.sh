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
podman build -t todoapp-server -f ./docker/Dockerfile_todoapp_conoha .
podman save todoapp-server | gzip | ssh -i ~/.ssh/deploy_key -o BatchMode=yes ${USERNAME}@${HOST} -p ${PORT} 'gunzip | podman load'

# マイグレーションとコンテナの起動
ssh -i ~/.ssh/deploy_key -p $PORT $USERNAME@$HOST << EOF
  cd todoapp-user-server
  git pull 
  yarn build
  env
  TODOAPP_ENV=production yarn migration:show
  TODOAPP_ENV=production yarn migration:run

  # Docker コンテナの起動（ここを修正または追加）
  podman stop todoapp-server || true  # 既に実行中のコンテナがあれば停止
  podman rm todoapp-server || true  # 停止したコンテナを削除
  podman run -d --name todoapp-server -p 3300:3300 todoapp-server  # 新しいコンテナを起動
EOF

# デプロイメントの成功確認
if [ $? -eq 0 ]; then
    echo "Deployment succeeded."
else
    echo "Deployment failed."
    exit 1
fi