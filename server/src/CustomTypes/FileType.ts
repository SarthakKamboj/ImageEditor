import { Stream } from 'stream';

export interface FileType {
    filename: string;
    mimetype: string;
    encoding: string;
    path: string;
    createReadStream: () => Stream;
}
