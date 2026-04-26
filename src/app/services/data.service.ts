export class DataService {
    static getToys() {
        return [
            {
                id: 1,
                name: 'Edukativni tablet za decu'
            },
            {
                id: 2,
                name: 'LEGO City policijska stanica'
            },
            {
                id: 3,
                name: 'Konstruktorski set “Grad”'
            }
        ]
    }

    static getTypeOfToys() {
        return [
            {
                id: 1,
                name: 'Edukativna igračka'
            },
            {
                id: 2,
                name: 'Konstruktorski set'
            },
            {
                id: 3,
                name: 'Vozilo'
            }
        ]
    }
}