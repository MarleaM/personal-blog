import multer from 'fastify-multer';

const storage = multer.memoryStorage(); //so that we aren't actually storing it, it will be discarded auto b/c it live in ram

const upload = multer({storage: storage});

export default upload;
