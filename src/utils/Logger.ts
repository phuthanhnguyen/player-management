import chalk from 'chalk';

export default class Logger {
  // Display info logs in blue
  public static info = (args: unknown) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}][INFO] `, typeof args === 'string' ? chalk.blueBright(args) : args)
    );

  // Display warning logs in yellow
  public static warn = (args: unknown) =>
    console.log(
      chalk.yellow(
        `[${new Date().toLocaleString()}][WARN] `,
        typeof args === 'string' ? chalk.yellowBright(args) : args
      )
    );

  // Display error logs in red
  public static error = (args: unknown) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}][INFO] `, typeof args === 'string' ? chalk.redBright(args) : args)
    );
}
