package com.l2kstudios.languageguidebook.server.constants;

public class SessionConstants {
	
	private SessionConstants() {
		throw new AssertionError("Uninstantiable Class");
	}
	
	public static int SESSION_TIME_LIMIT = 1000 * 60 * 20;
	public static String SESSION_COOKIE_NAME = "session-token";
	
}
