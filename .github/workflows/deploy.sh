bash
#!/bin/bash
set -e

# GitHub Secretsから必要なシークレットキー情報を取得
KEY=$KEY
HOST=$HOST
USERNAME=$USERNAME
PORT=$PORT

# SSH鍵ペアが存在しなければ、自動生成する
if [ ! -f ~/.ssh/id_rsa ] || [ ! -f ~/.ssh/id_rsa.pub ]; then
    ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
fi

# Conoha VPSへSSH接続するキーを作成
mkdir -p ~/.ssh
ssh-keyscan -p ${PORT} ${HOST} >> ~/.ssh/known_hosts
echo "${KEY}" >> ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# 公開鍵をリモートサーバーのauthorized_keysに追加
ssh -o "StrictHostKeyChecking=no" -i ~/.ssh/deploy_key ${USERNAME}@${HOST} -p ${PORT} "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys" < ~/.ssh/id_rsa.pub

# ローカルでDockerイメージをビルドしてリモートホストへ転送
docker build -t todoapp-server .
docker save todoapp-server | gzip | ssh -i ~/.ssh/deploy_key ${USERNAME}@${HOST} -p ${PORT} 'gunzip | docker load'

# SSHで接続
ssh -i ~/.ssh/deploy_key ${USERNAME}@${HOST} -p ${PORT} << EOF

# Dockerコンテナの削除
podman rm -f todoapp-server > /dev/null 2>&1

# エラーがあれば出力
if [ \$? -ne 0 ]; then
    echo "Failed to remove Docker container."
    exit 1
fi

# Dockerコンテナの実行
podman run -d --name=todoapp-server -p 3000:3000 todoapp-server > /dev/null 2>&1

# エラーがあれば出力
if [ \$? -ne 0 ]; then
    echo "Failed to run Docker container."
    exit 1
fi