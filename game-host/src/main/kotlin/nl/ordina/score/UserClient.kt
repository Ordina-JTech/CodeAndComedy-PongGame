package nl.ordina.score

import io.micronaut.http.annotation.Get
import io.micronaut.http.client.annotation.Client
import io.reactivex.Maybe

@Client("/score")
interface UserClient {

    @Get("/")
    fun getAllScore(): Maybe<List<User>>

    @Get("/{userId}")
    fun getScore(userId: String) : Maybe<User>
}