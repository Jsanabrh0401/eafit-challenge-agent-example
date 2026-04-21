# rag/docs — Base de conocimiento local de trAIner

Cualquier archivo que pongas en esta carpeta será indexado automáticamente por el
chatbot (RAG) al arrancar con `./scripts/start.sh`.

## Formatos soportados

- `.md`   → Markdown
- `.txt`  → texto plano
- `.pdf`  → PDFs
- `.csv`  → datos tabulares

## Cómo agregar tus documentos

1. Copia tus archivos aquí, por ejemplo:
   - `rag/docs/rutinas-fuerza.pdf`
   - `rag/docs/tabla-nutricion.csv`
   - `rag/docs/guia-tecnica.md`
2. Reinicia el stack:
   ```bash
   docker compose -f docker/docker-compose.yml down
   ./scripts/start.sh
   ```
3. Revisa los logs para confirmar que se indexaron:
   ```bash
   docker compose -f docker/docker-compose.yml logs -f chatbot
   ```

## ¿Y los documentos del Drive?

Para archivos alojados en Google Drive, no los pongas aquí: agrégalos en
`agent-pack.yaml`, sección `rag.remoteUrls`, con enlaces de descarga directa.

Ejemplo (el archivo en Drive debe tener permiso **Cualquiera con el enlace**):

```yaml
rag:
  remoteUrls:
    - https://drive.google.com/uc?export=download&id=TU_FILE_ID
```

Para obtener el `TU_FILE_ID`, abre el archivo en Drive, pulsa "Compartir" →
"Cualquiera con el enlace" → copia el enlace. De la URL
`https://drive.google.com/file/d/ABC123XYZ/view?usp=sharing` el `FILE_ID` es `ABC123XYZ`.
