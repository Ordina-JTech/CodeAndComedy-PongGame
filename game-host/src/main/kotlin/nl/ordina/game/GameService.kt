package nl.ordina.game

import io.reactivex.Maybe
import io.reactivex.schedulers.Schedulers
import org.slf4j.LoggerFactory
import java.util.stream.Collectors
import javax.inject.Singleton

@Singleton
class GameService {
    private val log = LoggerFactory.getLogger(GameService::class.java)
    private val games = ArrayList<Game>()

    fun findGameById(gameId: String): Maybe<Game> {
        return Maybe.just(gameId).subscribeOn(Schedulers.io()).map {
            log.debug("Game of game {} is ready to return ...", gameId)
            games.stream().filter{ game -> game.gameId == gameId }.findFirst().get()
            }
        }

    fun findAllGames(status: String): Maybe<List<Game>> {
        return Maybe.just("").subscribeOn(Schedulers.io()).map {
            log.debug("List of games is ready to return ...")
            games.stream().filter { game -> game.status == status }.collect(Collectors.toList())
        }
    }

    fun findStatusByGameId(gameId: String): Maybe<String> {
        return Maybe.just("").subscribeOn(Schedulers.io()).map {
            log.debug("Finding status of a game ...")
            games.stream().filter { game -> game.gameId == gameId }.findFirst().get().status
        }
    }

    fun addNewGame(game: Game): Boolean {
        if(!games.stream().anyMatch{listGame -> listGame.gameId == game.gameId}){
            val streamCrashed = games.stream().filter { listGame -> listGame.displayName ==  game.displayName && (listGame.status != "finished" || listGame.status != "crashed")}.findFirst()
            if(streamCrashed.isPresent){
                streamCrashed.get().status = "crashed"
                games.add(game)
            }else {
                games.add(game)
            }
            return true
        }
        return false
    }

    fun setGameToFull(gameId: String): Boolean {
        val game = games.stream().filter{ listGame -> listGame.gameId == gameId}.findFirst()
        return if(game.isPresent) {
            game.get().status = "full"
            true
        }else{
            false
        }
    }

    fun setGameToFinished(gameId: String): Boolean {
        val game = games.stream().filter{ listGame -> listGame.gameId == gameId}.findFirst()
        return if(game.isPresent) {
            game.get().status = "finished"
            true
        }else{
            false
        }
    }
}