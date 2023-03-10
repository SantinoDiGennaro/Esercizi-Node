function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));

        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}

const agetResults = async (player) => {
    try {
        const res = await luckyDraw(player);
        console.log(res);
    } catch (error) {
        console.error(error.message);
    }
};

const players = ["Tina", "Jorge", "Julien"];

players.map((el) => agetResults(el));
