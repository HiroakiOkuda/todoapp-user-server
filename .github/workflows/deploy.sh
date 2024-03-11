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

# ロック問題の解決スクリプト
clear_locks() {
    echo "Checking for lock files..."
    # Podman のロックファイルのパスを指定します。これはシステムによって異なる場合があります。
    lock_path="/var/lib/containers/storage/overlay-images"

    # ロックファイルが存在するか確認
    if [ -d "$lock_path" ]; then
        # ロックファイルを安全に削除
        echo "Removing lock files..."
        rm -f $lock_path/*.lock
        echo "Lock files removed."
    else
        echo "No lock files found."
    fi
}

# Podman サービスの再起動
restart_podman() {
    echo "Restarting Podman service..."
    systemctl restart podman
    echo "Podman service restarted."
}

# スクリプトの実行
clear_locks
restart_podman

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
if [ $? -eq 0 ]; then
    echo "Deployment succeeded"
else 
    echo "Deployment failed"
    exit 1
fi