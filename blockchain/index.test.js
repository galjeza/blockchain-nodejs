const Blockchain = require('./index');
const Block = require('./block');


describe('Blockchain', () => {
    let bc;
    let bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();

    });

    it('Chain se začne z genesis blockom', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Dodajanje blocka', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('Preveri veljavnost verige', () => {
        bc2.addBlock('test data 2');
        expect(bc.isValidChain(bc2.chain)).toBe(true);

    });

    it('Preveri neveljavnost verige z napačnim genesis blockom', () => {
        bc2.chain[0].data = 'bad data'; // spremeni podatke v genesis blocku v napačne
        expect(bc.isValidChain(bc2.chain)).toBe(false); //
    });


    it('Preverjanje napačne verige', () => {
        bc2.addBlock('test data 2');
        bc2.chain[1].data = 'currupt data'; // spremeni podatke v blocku v napačne
        expect(bc.isValidChain(bc2.chain)).toBe(false); //
    } );

    // test the replaceChain method
    it('Zamenjaj verigo z daljšo in veljavno verigo', () => {
        bc2.addBlock('test data 2');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('Ne zamenjuj verige z daljšo in neveljavno verigo', () => {
        bc.addBlock('test data 1');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });



});