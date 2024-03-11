# GitHub Secretsから必要なシークレットキー情報を取得
KEY="$KEY"
HOST="$HOST"
USERNAME="$USERNAME"
PORT="$PORT"

# Conoha VPSへSSH接続するキーを設定
mkdir -p ~/.ssh
ssh-keyscan -p ${PORT} ${HOST} >> ~/.ssh/known_hosts
echo "${KEY}" > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# ローカルでPodmanイメージをビルドしてリモートホストへ転送
podman build -t todoapp-server .
podman save todoapp-server | gzip | ssh -i ~/.ssh/deploy_key "${USERNAME}@${HOST}" -p "${PORT}" 'gunzip | podman load'

# SSHで接続し、Dockerコンテナの管理
ssh -i ~/.ssh/deploy_key "${USERNAME}@${HOST}" -p "${PORT}" << 'EOF'

# Podmanコンテナの削除と実行
podman rm -f todoapp-server || true

if ! podman run -d --name=todoapp-server -p 3400:3400 todoapp-server; then
    echo "Failed to run Podman container."
    exit 1
fi

EOF

# エラーがあれば出力
if [ \$? -eq 0 ]; then
    echo "Deployment succeeded"
else 
    echo "Deployment failed"
    exit 1
fi