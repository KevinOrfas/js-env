/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    if(jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated the follow warnings'));
        return jsonStats.warnings.map(warning => console.log(chalk.red(warning)));
    }

    console.log(`Webpack starts: ${stats}`);

    //If we got this far the build succeed
    console.log(chalk.green('Your app has been built for production and written to the disk'));

    return 0;
});
