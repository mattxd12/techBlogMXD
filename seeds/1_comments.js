
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
                          blog_post_id: '1',
                          subject: 'subject',
                          comment: 'ones and zeros',
                          username: 'mxd',
                          likes: 14,
                          user_id: 1,
                          created_at:'2003-01-02T00:01:00-0700',
                          updated_at:'2003-01-02T00:01:00-0700'
                      }),
      ]);
    });
};
