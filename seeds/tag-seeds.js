const { Tag } = require('../models');

const tagData = [
    {
        tag_name: 'tag1',
        player_id:4
    },
    {
        tag_name: 'tag2',
        player_id: 3
    },
    {
        tag_name: 'tag3',
        player_id: 2
    },
    {
        tag_name: 'tag4',
        player_id: 1
    }
];

const seedTags = () => Tag.bulkCreate(tagData);
module.exports = seedTags;