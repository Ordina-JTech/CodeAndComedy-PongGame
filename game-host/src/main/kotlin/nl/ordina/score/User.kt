package nl.ordina.score

import java.util.function.Supplier
import javax.persistence.*

@Entity
class User(
        @Id
        @Column(nullable = false, unique = true)
        val userId: String,

        @Column(nullable = false)
        var points: Long
)