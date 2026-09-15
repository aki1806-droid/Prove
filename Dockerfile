# Immagine minima: il progetto non ha dipendenze, serve solo il runtime Node.
FROM node:22-alpine

WORKDIR /app

# Nessun npm install: non ci sono pacchetti da scaricare.
COPY package.json ./
COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# L'endpoint /health non richiede autenticazione ed e' pensato per questo.
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Utente non privilegiato: l'immagine node lo fornisce gia'.
USER node

CMD ["node", "src/index.js"]
