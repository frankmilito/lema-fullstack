export const selectUsersTemplate = `
SELECT *
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

export const selectUserTemplate = `
SELECT *
FROM users
WHERE users.id = ?
`;