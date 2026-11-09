class Pokemon {
    constructor(data) {
        //had to have this broken down and explained as i could not write this without an error
        const stats = Object.fromEntries(
            data.stats.map(({ base_stat, stat }) => [stat.name, base_stat]),
        );
        this.id = data.id;
        this.name = data.name;
        this.image = data.sprites.front_default;
        this.types = data.types.map(({ type }) => type.name);
        this.maxHealth = stats.hp;
        this.health = this.maxHealth;
        this.attackPower = stats.attack;
        this.defense = stats.defense;
    }

    //Reduce current health by amount 
    takedamage(amount){

    }

    //Restore current health by amount 
    heal(amount){

    }

    //Restore health to maximum 
    resetHealth(){

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