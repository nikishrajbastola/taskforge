FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_SUPABASE_URL=https://lclmgmjjpwysicxlwjoq.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_8DcW802S4i2VvfxFHWNlyA_xzxT6QvU

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]