class Runner {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.maxHR = 208 - 0.7 * this.age;
        this.races = [];
    }
}