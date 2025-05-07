# Link Brief

## Getting Started

For this guide I will be using AWS EC2 service but you can choose any cloud provider

### Get your elastic IP
1. Navigate to EC2 -> Elastic IP
2. Create an Elastic IP

### Create Your Server
1. Open AWS console
2. From there navigate to EC2 -> instances
3. Launch Instance
4. Choose your Specs (The app is very small and not meant for production use so you can choose minimal specs)
5. Launch the instance

### Configure the Server
1. Make an `ssh` connection to the server
2. Update the server and install `docker` & `git`
3. Clone the repo to the server
4. Copy the `.env.example` file to create `.env` file and fill it with the data:
    - `JWT_SECRET`: any random string
    - `JWT_EXPIRE_TIME`: time expression like `7d`
    - `DB_FILE_NAME`: the same you used in the build command
    - `VITE_WEB_URL`: the url of the frontend portal
5. In the repo run the command `docker build -t mulham --build-arg DB_FILE_NAME='file:local.db' .`
6. Finally run the command `docker run --rm -d -p 3000:3000 -p 8080:8080 --env-file ./.env mulham`

After That the app will be running on the server. You can add a custom domain name and configure nginx but that is optional
