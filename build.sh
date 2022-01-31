#Building voter app client.....
echo 'Building voter app client'
cd app-client/
npm install
npm run build

# Build voter app server.....
echo 'Building voter app server'
cd ../app-server/
npm install --prod