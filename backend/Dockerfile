FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
#Maybe uncomment these for prod:
#ENV NODE_ENV=production
#EXPOSE 5000    


# Maybe delete this for prod:
CMD ["npm", "run", "dev"]