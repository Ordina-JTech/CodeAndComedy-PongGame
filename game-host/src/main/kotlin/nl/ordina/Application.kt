package nl.ordina

import io.micronaut.runtime.Micronaut
import com.google.firebase.FirebaseApp
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseOptions
import java.io.FileInputStream



object Application {

    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.build()
                .packages("nl.ordina")
                .mainClass(Application.javaClass)
                .start()
        System.out.println("Start successful")
//        val serviceAccount = FileInputStream("/Users/tte22905/development/code-and-comedy-game-host/src/main/resources/codeandcomedy-9aae1-firebase-adminsdk-nrd6p-6cfeb46ad1.json")
//        val options = FirebaseOptions.Builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                .setDatabaseUrl("https://codeandcomedy-9aae1.firebaseio.com")
//                .build()
//
//        FirebaseApp.initializeApp(options)
//        System.out.println("Using Firebase application, type: " + FirebaseApp.getInstance().name)
    }
}