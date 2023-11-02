const express = require("express");
const cors = require("cors");
const sharp = require("sharp");

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.post('/', (req, res) => {
    try {
        const imageBase64 = req.body.image;

        if (!imageBase64) return res.status(400).send("Missing image.");

        sharp(Buffer.from(imageBase64, 'base64'))
            .toFormat('png')
            .toBuffer()
            .then(pngBuffer => {
                res.set('Content-Type', 'image/png');
                return res.status(200).send(pngBuffer);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Error during image proccessing.');
            });
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid request.');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
