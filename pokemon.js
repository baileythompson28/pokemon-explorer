class Pokemon {
    static totalCreated = 0;
    constructor(data) {
        Pokemon.totalCreated++;
        const stats = Object.fromEntries(
            data.stats.map(({base_stat, stat}) => [stat.name, base_stat]),
        );
        this.id = data.id;
        this.name = data.name;
        this.image = data.sprites.front_default;
        this.types = data.types.map(({type}) => type.name);
        this.maxHealth = stats.hp;
        this.health = this.maxHealth;
        this.attackPower = stats.attack;
        this.defense = stats.defense;
    }
    get health() {
        return this._health;
    }
    set health(value) {
        if (!Number.isFinite(value)) {
            throw new TypeError("error");
        }
        this._health = Math.max(0, Math.min(this.maxHealth, value));
    }
    
    get healthPercent() {
        return (this.health / this.maxHealth) * 100;
    }

    get isFainted() {
        return this.health === 0;
    }

        static getTotalCreated(){
            return Pokemon.totalCreated;
    }

    //Reduce current health by amount 
    takeDamage(amount) {
        if (!Number.isFinite(amount)) {
            throw new TypeError("error");
        }
        if (amount < 0) {
            throw new RangeError("damage cannot be negative");
        }
        this.health = this.health - amount;
    }

    //Restore current health by amount 
    heal(amount) {
        if (!Number.isFinite(amount)) {
            throw new TypeError("Healing amount must be a finite number");
        }
        if (amount < 0) {
            throw new RangeError("Healing amount cannot be negative");
        }
        this.health = this.health + amount;
    }

    //Restore health to maximum 
    resetHealth() {
        this.health = this.maxHealth;
    }


}

//Testing:
// const pokemon = await getPokemon(25); 
// console.log(pokemon.name); 
// console.log(pokemon.maxHealth); 
// pokemon.takeDamage(20); 
// console.log(pokemon.health); 
// pokemon.heal(10); 
// console.log(pokemon.health); 
// pokemon.resetHealth(); 
// console.log(pokemon.health); 
// console.log(pokemon.isFainted); 
// console.log(Pokemon.getTotalCreated()); 