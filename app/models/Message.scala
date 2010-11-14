package models

import javax.persistence.Entity
import play.db.jpa._

@Entity
class Message(var body: String) extends Model {
	
}

object Message extends QueryOn[Message] {

}