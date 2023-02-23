module.exports = (sequelize, DataTypes) => {
    const Quote = sequelize.define("Quotes", {
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false
        },
        body:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });

    Quote.associate = (models) => {
        Quote.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    }

    return Quote;
}