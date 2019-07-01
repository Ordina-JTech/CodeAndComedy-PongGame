package nl.ordina.game

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Game(
        @Id
        @Column(nullable = false, unique = true)
        val gameId: String,

        @Column(nullable = false, unique = true)
        val location: String,

        @Column(nullable = false, unique = true)
        val displayName: String,

        @Column(nullable = false)
        var status: String
)