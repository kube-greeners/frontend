const fs = require('fs');
import pixelmatch from 'pixelmatch'
import {PNG} from 'pngjs'


// Code mostly from: https://www.npmjs.com/package/cypress-image-diff-js

const adjustCanvas = async (image, width, height) => {
    if (image.width === width && image.height === height) {
        return image
    }

    const imageAdjustedCanvas = new PNG({
        width,
        height,
        bitDepth: image.bitDepth,
        inputHasAlpha: true,
    })

    PNG.bitblt(image, imageAdjustedCanvas, 0, 0, image.width, image.height, 0, 0)

    return imageAdjustedCanvas
}
const parseImage = async (image: string): Promise<PNG> => {
    return new Promise((resolve, reject) => {
        try {
            const fd = fs.createReadStream(image);
            fd.pipe(new PNG())
                // eslint-disable-next-line func-names
                .on('parsed', function () {
                    const that = this
                    resolve(that)
                })
                .on('error', (error) => reject(error))
        } catch (e) {
            reject(e);
            return;
        }
    })
}


const getSimilarityRatio = async (img1Path: string, img2Path: string) => {
    const baselineImg = await parseImage(img1Path)
    const comparisonImg = await parseImage(img2Path)
    const diff = new PNG({
        width: Math.max(comparisonImg.width, baselineImg.width),
        height: Math.max(comparisonImg.height, baselineImg.height),
    })

    const baselineFullCanvas = await adjustCanvas(
        baselineImg,
        diff.width,
        diff.height
    )

    const comparisonFullCanvas = await adjustCanvas(
        comparisonImg,
        diff.width,
        diff.height
    )

    const pixelMismatchResult = pixelmatch(
        baselineFullCanvas.data,
        comparisonFullCanvas.data,
        diff.data,
        diff.width,
        diff.height,
        {threshold: 0.1}
    )

    return (pixelMismatchResult / diff.width / diff.height) ** 0.5
}

export {getSimilarityRatio}
