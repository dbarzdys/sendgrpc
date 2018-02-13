declare module NodeJS  {
    interface Global {
        PORT: number;
        CONFIG_FILE: string;
    }
}
