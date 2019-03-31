<?php

/*
 * To access:
 *     require_once(app_path().'/constants.php');
 *     ...
 *     CELL_CONFIRMATION_LENGTH
 */

    define("EMAIL_CONFIRMATION_LENGTH",                                                        20 );
    define("EMAIL_MAX_LENGTH",                                                                128 );
    define("USERNAME_MAX_LENGTH",                                                             128 );
    define("PASSWORD_LENGTH",                                                                  60 );
    
    define("MAX_LOGIN_ATTEMPTS",                                                                5 );
    // MS - 2 hours
    define("LOCK_TIME",                                                       (2 * 60 * 60 * 1000));

    //TODO how often should we force a user to log back in? Never?
    //in seconds or null for never expires
    define("LOGIN_TOKEN_EXPIRATION",                                                         null );

    define("ACCOUNT_STATUS_UNCONFIRMED",                                                        0 );
    define("ACCOUNT_STATUS_CONFIRMED",                                                          1 );
    define("ACCOUNT_STATUS_PREMIUM",                                                            2 );
    define("ACCOUNT_STATUS_PREV_PREMIUM",                                                       3 );
    define("ACCOUNT_STATUS_CANCELLED",                                                          4 );
    define("ACCOUNT_STATUS_BANNED",                                                             5 );
    define("ACCOUNT_STATUS_ADMIN",                                                              6 );
    define("ACCOUNT_STATUSES",              ["unconfirmed","ok","premium","ok","cancelled","banned",
                                             "admin"]);
    define("USER_OPTION_KEYS",												["showExternalImages"]);