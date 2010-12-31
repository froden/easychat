package controllers

import play._
import play.mvc._
import models._
import com.google.gson._
import com.google.gson.reflect._
import java.lang.reflect.Type

object Application extends Controller {
    
    def index = Template
    
}

object Messages extends Controller {
	def index = {
		val messages = Message.findAll()
		Json(messages.toArray)
	}
	
	def create(body: String) = {
		new Message(body).save();
	}
}
