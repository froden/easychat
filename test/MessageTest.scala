import models._
import org.junit._
import org.junit.Assert._
import org.scalatest.matchers.ShouldMatchers
import play.db.jpa.JPQL._
import play.test._

class MessageTest extends UnitFlatSpec with ShouldMatchers {

  @Test
  def shouldSaveAndRetrive() {
    "Creating a message" should "be succesfull" in {
      val body = "This is a message"
      (new Message(body)).save()
      val message = Message.findAll().first
      message should not be (null)
      message.body should be(body)
    }
  }
}