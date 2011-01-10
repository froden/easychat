package models

import javax.persistence.Entity
import play.db.jpa._

@Entity
class Message(var body: String) extends Model {

}

object Message extends QueryOn[Message] {
	def findAllAfter(last: Long = 0L) = {
		val allMessages: List[Message] = findAll()
		allMessages.filter {msg: Message => msg.id > last}
	}
}