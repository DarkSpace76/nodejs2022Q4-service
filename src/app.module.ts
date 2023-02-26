/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.services';
import { UserController } from './user/user.controller';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { TrackController } from './track/track.controller';
import { AlbumService } from './album/album.services';
import { ArtistService } from './artist/artist.services';
import { FavoritesService } from './favorites/favorites.services';
import { TrackService } from './track/track.services';
import { DbModule } from './db.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [DbModule, AuthModule],
  controllers: [AppController, UserController, AlbumController, ArtistController, FavoritesController, TrackController],
  providers: [AppService, UserService, AlbumService, ArtistService, FavoritesService, TrackService],
})
export class AppModule { }
