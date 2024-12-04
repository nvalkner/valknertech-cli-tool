GITHUB_PATH="/Users/nicolaivalkner/Kode/"

migrateAM() {
    echo "Initiating update on existing database"

    # AM Migrate
    echo "Migrating AM database..."
    cd "${GITHUB_PATH}bygr-backend-am-qm/Bygr.Web.RestApi.AM"
    git pull
    dotnet run --Migrate

    echo "Migration completed."
    cd "${GITHUB_PATH}"
}

initDB() {
    echo "Initiating new database"

    # AM Migrate
    echo "Init AM database..."
    cd "${GITHUB_PATH}bygr-backend-am-qm/Bygr.Web.RestApi.AM"
    git pull
    dotnet run --Init

    echo "Init completed."
    cd "${GITHUB_PATH}"

    # QM Migrate
    echo "Init QM database..."
    cd "${GITHUB_PATH}bygr-backend-am-qm/Bygr.Web.RestApi.QM"
    git pull
    dotnet run --Init

    echo "Init completed."
    cd "${GITHUB_PATH}"
}

migrateQM() {

    echo "Initiating update on existing database"

    # QM Migrate
    echo "Migrating QM database..."
    cd "${GITHUB_PATH}bygr-backend-am-qm/Bygr.Web.RestApi.QM"
    git pull
    dotnet run --Migrate

    echo "Migration completed."
    cd "${GITHUB_PATH}"
}

login() {
    node /Users/nicolaivalkner/Kode/valknertech-cli-tool/loginToAws.js
}

help() {
    node /Users/nicolaivalkner/Kode/valknertech-cli-tool/help.js
}

docker() {
    cd /Users/nicolaivalkner/Kode/valknertech-cli-tool
    node docker.js
}

startMG() {
    # Start MacGyverBackend in a new terminal window
    osascript -e 'tell app "Terminal" to do script "startMacGyverBackend"'

    # Start MacGyverFrontend in a new terminal window
    osascript -e 'tell app "Terminal" to do script "startMacGyverFrontend"'
}

startMacGyverBackend() {
    cd "${GITHUB_PATH}bygr-admin/Bygr.Admin.Web"
    git pull
    dotnet run -configuration Debug
}

startMacGyverFrontend() {
    cd "${GITHUB_PATH}bygr-admin/Bygr.Admin.Web/ClientApp"
    git pull
    npm install
    npm start
}

edit() {
    code ~/.zshrc
}
