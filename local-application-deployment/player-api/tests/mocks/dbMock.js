class MockModel {
    constructor(name, definition) {
        this.name = name;
        this.definition = definition;
        this.data = [];
        this.autoIncrement = 1;
    }

    build(obj) {
        return { ...obj };
    }

    create(obj) {
        const newObj = { ...obj, id: this.autoIncrement++ };
        this.data.push(newObj);
        return newObj;
    }

    findAll(options) {
        // Mimic Sequelize's findAll method
        if (options?.where) {
            return this.data.filter((item) =>
                Object.entries(options.where).every(([key, value]) => item[key] === value)
            );
        }
        return this.data;
    }

    findOne(options) {
        // Mimic Sequelize's findOne method
        if (options?.where) {
            return this.data.find((item) =>
                Object.entries(options.where).every(([key, value]) => item[key] === value)
            );
        }
        return null;
    }

    update(values, options) {
        // Mimic Sequelize's update method
        let updatedCount = 0;
        this.data = this.data.map((item) => {
            if (options?.where && Object.entries(options.where).every(([key, value]) => item[key] === value)) {
                updatedCount++;
                return { ...item, ...values };
            }
            return item;
        });
        return [updatedCount];
    }

    destroy(options) {
        // Mimic Sequelize's destroy method
        const initialLength = this.data.length;
        this.data = this.data.filter(
            (item) => !(options?.where && Object.entries(options.where).every(([key, value]) => item[key] === value))
        );
        return initialLength - this.data.length; // Number of items deleted
    }
}

class MockDB {
    constructor() {
        this.models = {};
    }

    define(name, definition) {
        // Mimic Sequelize's define method
        const model = new MockModel(name, definition);
        this.models[name] = model;
        return model;
    }
}

// Export a singleton instance of MockDB
module.exports = new MockDB();