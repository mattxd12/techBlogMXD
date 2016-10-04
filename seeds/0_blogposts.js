exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('blogposts').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('blogposts').insert({
                    name: 'mxd',
                    title: 'blah',
                    content: 'whut is code?',
                    likes: 14,
                    user_id: 1,
                    comments: 0,
                    views: 0,
                    tags: 'ruby javascript css',
                    created_at:'2003-01-02T00:01:00-0700',
                    updated_at:'2003-01-02T00:01:00-0700'
                }),
                knex('blogposts').insert({
                    name: 'mxd',
                    title: 'blah',
                    content: 'whut is code?',
                    likes: 14,
                    user_id: 1,
                    comments: 0,
                    views: 0,
                    tags: 'ruby javascript css',
                    created_at:'2003-01-02T00:01:00-0700',
                    updated_at:'2003-01-02T00:01:00-0700'
                }),
                knex('blogposts').insert({
                    name: 'mxd',
                    title: 'blah',
                    content: 'whut is code?',
                    likes: 14,
                    user_id: 1,
                    comments: 0,
                    views: 0,
                    tags: 'ruby javascript css',
                    created_at:'2003-01-02T00:01:00-0700',
                    updated_at:'2003-01-02T00:01:00-0700'
                })
            ]);
        });
};
