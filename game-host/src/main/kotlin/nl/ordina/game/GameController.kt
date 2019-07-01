package nl.ordina.game

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.QueryValue
import io.micronaut.http.hateos.JsonError
import io.reactivex.Maybe
import nl.ordina.score.UserService
import org.slf4j.LoggerFactory
import javax.validation.Valid


@Controller("/games")
class GameController(private val gameService: GameService, private val userService: UserService) {

    @Post("/register")
    fun gameRegister(game: Game): HttpResponse<JsonError> {
        log.debug("GameController.gameRegister() executed...")
        return if (gameService.addNewGame(game))
            HttpResponse.ok()
        else
            HttpResponse.notFound()
    }

    @Post("/finished")
    fun gameFinished(gameFinished: GameFinished): HttpResponse<JsonError> {
        log.debug("GameController.gameFinished() executed...")
        if (gameService.findStatusByGameId(gameFinished.gameId).blockingGet() == "full"
                && gameService.setGameToFinished(gameFinished.gameId)
                //&& userService.addScoreToUser(gameFinished.userId)
                ) {
            return HttpResponse.ok()
        }
        return HttpResponse.notFound()
    }

    @Post("/full")
    fun gameFull(gameId: String): HttpResponse<JsonError> {
        log.debug("GameController.gameFull() executed...")
        return if (gameService.setGameToFull(gameId)) {
            HttpResponse.ok()
        } else {
            HttpResponse.notFound()
        }
    }

    @Get("/")
    fun getAllGames(@QueryValue(value = "status", defaultValue = "open") @Valid status: String): Maybe<List<Game>> {
        log.debug("GameController.getAllGames() executed...")
        return gameService.findAllGames(status)
    }

    @Get("/{gameId}")
    fun getGameById(gameId: String): Maybe<Game> {
        log.debug("GameController.getGameById({}) executed...", gameId)
        return gameService.findGameById(gameId).onErrorComplete()
    }

    companion object {
        private val log = LoggerFactory.getLogger(GameController::class.java)
    }
}