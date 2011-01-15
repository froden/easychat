package models

import javax.persistence.Entity
import play.db.jpa._
import play.data.Validators._
import java.util.Date

@Entity
class Message(@Required var body: String) extends Model {
	@Required
    var postedAt = new Date()
}

object Message extends QueryOn[Message] {
	def findAllAfter(last: Long = 0L) = {
		find("id > ? order by id", last).fetch(100)
	}
}