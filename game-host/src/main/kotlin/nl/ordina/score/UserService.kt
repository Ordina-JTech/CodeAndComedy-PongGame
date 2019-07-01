package nl.ordina.score

import io.reactivex.Maybe
import io.reactivex.schedulers.Schedulers
import org.slf4j.LoggerFactory
import java.util.concurrent.ConcurrentHashMap
import javax.inject.Singleton


@Singleton
class UserService {
    private val log = LoggerFactory.getLogger(UserService::class.java)
    private val users = ArrayList<User>()


    fun findUserByUserId(userId: String): Maybe<User> {
        return Maybe.just(userId).subscribeOn(Schedulers.io()).map {
            log.debug("User of user {} is ready to return ...", userId)
            users.stream().filter { user -> user.userId == userId }.findFirst().get()
        }
    }

    fun findAllUsers(): Maybe<List<User>> {
        return Maybe.just("").subscribeOn(Schedulers.io()).map {
            log.debug("List of score from all users are ready to return ...")
            users
        }
    }

    fun addNewUser(userId: String): Boolean {
        return if(!users.stream().anyMatch { it.userId == userId }) {
            users.add(User(userId, 0))
            true
        }else{
            false
        }
    }

    fun addScoreToUser(userId: String): Boolean {
        val user = users.stream().filter { it.userId == userId }.findFirst()
        return if(user.isPresent){
            user.get().points++
            true
        }else{
            false
        }
    }

}