const initialCombination = (possibilityPlayer: number[]) => {
    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < 1) {
        const randomIndex: number = Math.floor(Math.random() * possibilityPlayer.length);
        uniqueNumbers.add(possibilityPlayer[randomIndex]);
    }

    return Array.from(uniqueNumbers);
}

export default initialCombination;