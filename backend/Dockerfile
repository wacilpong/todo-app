FROM node:12.13.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

COPY . .
EXPOSE 3777
CMD ["npm", "run", "start:dev:server"]