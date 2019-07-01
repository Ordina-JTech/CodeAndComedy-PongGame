package nl.ordina.game

import io.micronaut.http.annotation.Get
import io.micronaut.http.client.annotation.Client
import io.reactivex.Maybe

@Client("/games")
interface GameClient {

    @Get("/")
    fun getGames() : Maybe<List<Game>>
}