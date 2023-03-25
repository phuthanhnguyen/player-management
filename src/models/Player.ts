import { model, Schema } from 'mongoose';

export interface IPlayer {
  nickname: string;
  score: number;
  rank?: number;
}

const PlayerSchema = new Schema<IPlayer>(
  {
    nickname: {
      type: String,
      require: true,
      unique: true
    },
    score: {
      type: Number,
      require: true
    },
    rank: {
      type: Number,
      require: false
    }
  },
  {
    versionKey: false
  }
);

export default model<IPlayer>('Player', PlayerSchema);
