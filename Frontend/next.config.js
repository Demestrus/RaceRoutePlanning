// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath:
        process.env.NODE_ENV === 'production'
            ? '/RaceRoutePlanning'
            : undefined,
    output: 'export',
};

module.exports = nextConfig;
