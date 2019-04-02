(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/npcs"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Auth.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventbus_EventBus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventbus/EventBus.js */ "./resources/js/components/eventbus/EventBus.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    data: Object
  },
  data: function data() {
    return {
      showingModal: false,
      loginTitle: 'Login',
      activeTab: 'l',
      ajaxing: false,
      loginError: '',
      emailError: '',
      passwordError: '',
      registerError: '',
      rUsername: '',
      rEmail: '',
      rPassword: '',
      rPassword2: '',
      lEmail: '',
      lPassword: ''
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (document.getElementById("navbar-login")) {
      document.getElementById("navbar-login").addEventListener('click', function (event) {
        event.preventDefault();

        _this.showLoginModal();
      });
    }

    if (document.getElementById("navbar-register")) {
      document.getElementById("navbar-register").addEventListener('click', function (event) {
        event.preventDefault();

        _this.showRegisterModal();
      });
    }

    if (document.getElementById("nav-logout")) {
      document.getElementById("nav-logout").addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.clear(); //TODO doesn't work?

        document.getElementById('frm-logout').submit();
      });
    }

    _eventbus_EventBus_js__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$on('showLogin', function (title) {
      _this.showLoginModal(title);
    });
    _eventbus_EventBus_js__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$on('showRegister', function () {
      _this.showRegisterModal();
    });
  },
  methods: {
    showLoginModal: function showLoginModal(title) {
      this.loginTitle = title || "Login";
      this.loginModalChangeTab('l');
      this.showingModal = true;
    },
    showRegisterModal: function showRegisterModal() {
      this.loginModalChangeTab('r');
      this.showingModal = true;
    },
    hideLoginModal: function hideLoginModal() {
      this.showingModal = false;
    },
    loginModalChangeTab: function loginModalChangeTab(a) {
      this.activeTab = a;
    },
    login: function login() {
      this.loginError = '';
      this.emailError = '';
      this.passwordError = '';

      if (!this.lEmail.length) {
        this.emailError = "Please Input Your Email";
        return;
      }

      if (!this.lPassowrd.length) {
        this.passwordError = "Please Input Your Password";
        return;
      }

      var re = document.querySelector('#login-remember').checked;
      this.ajaxing = true;

      var _this = this;

      axios.post(SITE_URL + '/auth/login', {
        email: this.lEmail,
        password: this.lPassowrd,
        remember: re
      }).then(function (response) {
        _this.ajaxing = false;

        if (response.data && response.data.jwt) {
          //Success!
          //Save token to Local Storage
          localStorage.setItem('user', JSON.stringify(response.data)); //refresh the page
          //TODO DON'T REFRESH, or they will lose current NPC data, what to do?

          window.location.reload();
        } else {
          _this.loginError = "An error occurred. Please try again.";
        }
      }).catch(function (error) {
        _this.ajaxing = false;

        if (error.response.status === 401) {
          _this.loginError = "Invalid Email/Password";
        } else {
          _this.loginError = "An error occurred. Please try again.";
        }
      });
    },
    register: function register() {
      this.registerError = '';
      this.loginError = '';
      this.emailError = '';
      this.passwordError = '';

      if (!this.rEmail.length) {
        this.emailError = "Please Input Your Email";
      } else if (this.rEmail.indexOf('@') === -1 || this.rEmail.indexOf('.') === -1) {
        this.emailError = "Please Input a Valid Email";
      }

      if (!this.rUsername.length) {
        this.usernameError = "Please Input Your Username";
      }

      if (this.rPassword.length < 6) {
        this.passwordError = "Please Input Your Password (Min 6 Characters)";
      }

      if (this.rPassword !== this.rPassword2) {
        this.passwordError = "Your Passwords Do Not Match";
      }

      if (this.emailError.length || this.usernameError.length || this.passwordError.length) {
        return;
      }

      var re = document.querySelector('#register-remember').checked;
      this.ajaxing = true;

      var _this = this;

      axios.post(SITE_URL + "/auth/register", {
        email: this.rEmail,
        username: this.rUsername,
        password: this.rPassword,
        remember: re
      }).then(function (response) {
        _this.ajaxing = false;

        if (response.data) {
          //Success!
          //Save token and user data to Local Storage
          localStorage.setItem('user', JSON.stringify(response.data)); //refresh the page

          window.location.reload();
        } else {
          _this.registerError = "An error occurred. Please try again.";
        }
      }).catch(function (error) {
        _this.ajaxing = false;

        if (error.response && error.response.data && error.response.data.error) {
          switch (error.response.data.error) {
            case "invalid_password":
              _this.registerError = "Your password must be at least 6 characters long";
              break;

            case "username_in_use":
              _this.registerError = "This username is already in use";
              break;

            case "email_in_use":
              _this.registerError = "This email is already in use";
              break;

            case "unable_to_send_email":
              _this.registerError = "An error occurred. Please try again.";
              break;

            default:
              _this.registerError = "An error occurred. Please try again.";
          }
        } else {
          _this.registerError = "An error occurred. Please try again.";
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/My_Npcs.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/My_Npcs.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPC_GEN_DATA.vue */ "./resources/js/components/npcs/NPC_GEN_DATA.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function (_fromNow) {
      function fromNow(_x) {
        return _fromNow.apply(this, arguments);
      }

      fromNow.toString = function () {
        return _fromNow.toString();
      };

      return fromNow;
    }(function (v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return fromNow(v);
    }),
    nl2br: function nl2br(t) {
      return t.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  },
  extends: _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: {
    data: Object,
    newSavedNPC: Object
  },
  data: function data() {
    return {
      my_npcs: [],
      curr_npc: null,
      editing: false
    };
  },
  mounted: function mounted() {
    this.parseNPCsFromServer();
  },
  methods: {
    parseNPCsFromServer: function parseNPCsFromServer() {
      if (this.data.my_npcs.length) {
        for (var i = 0; i < this.data.my_npcs.length; i++) {
          this.my_npcs.push(this.parseNPCFromServerData(this.data.my_npcs[i]));
        }
      }

      this.curr_npc = this.my_npcs[0];
    },
    saveNewNPC: function saveNewNPC(npc) {
      this.my_npcs.push(npc); //this.curr_npc = this.my_npcs[this.my_npcs.length-1];

      this.curr_npc = npc;
      this.saveNewNPCToDB(npc);
    },
    showNPC: function showNPC(npc) {
      this.curr_npc = npc;
    },
    saveNewNPCToDB: function saveNewNPCToDB(npc) {
      axios.post(NEW_NPC_URL, {
        npc: npc
      }, config).then(function (response) {
        if (response.data && response.data.success) {
          console.log('saved to db');
          return;
        } //TODO handle error


        console.log('error saving to db');
        console.log(response.data);
      }).catch(function (error) {
        //TODO handle error
        console.log('catch error');
        console.log(error.response);
        console.log(error.response.data);
      });
    },
    saveChanges: function saveChanges(new_npc) {
      this.npc = new_npc;
      this.editing = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/NPC_GEN_DATA.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/NPC_GEN_DATA.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_npc_npc_appearances_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../json/npc/npc_appearances.json */ "./resources/js/components/json/npc/npc_appearances.json");
var _json_npc_npc_appearances_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_appearances.json */ "./resources/js/components/json/npc/npc_appearances.json", 1);
/* harmony import */ var _json_npc_npc_blessings_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../json/npc/npc_blessings.json */ "./resources/js/components/json/npc/npc_blessings.json");
var _json_npc_npc_blessings_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_blessings.json */ "./resources/js/components/json/npc/npc_blessings.json", 1);
/* harmony import */ var _json_npc_npc_bonds_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../json/npc/npc_bonds.json */ "./resources/js/components/json/npc/npc_bonds.json");
var _json_npc_npc_bonds_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_bonds.json */ "./resources/js/components/json/npc/npc_bonds.json", 1);
/* harmony import */ var _json_npc_npc_city_points_of_interest_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../json/npc/npc_city_points_of_interest.json */ "./resources/js/components/json/npc/npc_city_points_of_interest.json");
var _json_npc_npc_city_points_of_interest_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_city_points_of_interest.json */ "./resources/js/components/json/npc/npc_city_points_of_interest.json", 1);
/* harmony import */ var _json_npc_npc_curses_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../json/npc/npc_curses.json */ "./resources/js/components/json/npc/npc_curses.json");
var _json_npc_npc_curses_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_curses.json */ "./resources/js/components/json/npc/npc_curses.json", 1);
/* harmony import */ var _json_npc_npc_destinations_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../json/npc/npc_destinations.json */ "./resources/js/components/json/npc/npc_destinations.json");
var _json_npc_npc_destinations_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_destinations.json */ "./resources/js/components/json/npc/npc_destinations.json", 1);
/* harmony import */ var _json_npc_npc_details_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../json/npc/npc_details.json */ "./resources/js/components/json/npc/npc_details.json");
var _json_npc_npc_details_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_details.json */ "./resources/js/components/json/npc/npc_details.json", 1);
/* harmony import */ var _json_npc_npc_entities_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../json/npc/npc_entities.json */ "./resources/js/components/json/npc/npc_entities.json");
var _json_npc_npc_entities_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_entities.json */ "./resources/js/components/json/npc/npc_entities.json", 1);
/* harmony import */ var _json_npc_npc_flaws_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../json/npc/npc_flaws.json */ "./resources/js/components/json/npc/npc_flaws.json");
var _json_npc_npc_flaws_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_flaws.json */ "./resources/js/components/json/npc/npc_flaws.json", 1);
/* harmony import */ var _json_npc_npc_gods_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../json/npc/npc_gods.json */ "./resources/js/components/json/npc/npc_gods.json");
var _json_npc_npc_gods_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_gods.json */ "./resources/js/components/json/npc/npc_gods.json", 1);
/* harmony import */ var _json_npc_npc_hooks_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../json/npc/npc_hooks.json */ "./resources/js/components/json/npc/npc_hooks.json");
var _json_npc_npc_hooks_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_hooks.json */ "./resources/js/components/json/npc/npc_hooks.json", 1);
/* harmony import */ var _json_npc_npc_ideals_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../json/npc/npc_ideals.json */ "./resources/js/components/json/npc/npc_ideals.json");
var _json_npc_npc_ideals_json__WEBPACK_IMPORTED_MODULE_11___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_ideals.json */ "./resources/js/components/json/npc/npc_ideals.json", 1);
/* harmony import */ var _json_npc_npc_items_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../json/npc/npc_items.json */ "./resources/js/components/json/npc/npc_items.json");
var _json_npc_npc_items_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_items.json */ "./resources/js/components/json/npc/npc_items.json", 1);
/* harmony import */ var _json_npc_npc_life_events_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../json/npc/npc_life_events.json */ "./resources/js/components/json/npc/npc_life_events.json");
var _json_npc_npc_life_events_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_life_events.json */ "./resources/js/components/json/npc/npc_life_events.json", 1);
/* harmony import */ var _json_npc_npc_motivations_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../json/npc/npc_motivations.json */ "./resources/js/components/json/npc/npc_motivations.json");
var _json_npc_npc_motivations_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_motivations.json */ "./resources/js/components/json/npc/npc_motivations.json", 1);
/* harmony import */ var _json_npc_npc_obsessions_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../json/npc/npc_obsessions.json */ "./resources/js/components/json/npc/npc_obsessions.json");
var _json_npc_npc_obsessions_json__WEBPACK_IMPORTED_MODULE_15___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_obsessions.json */ "./resources/js/components/json/npc/npc_obsessions.json", 1);
/* harmony import */ var _json_npc_npc_personalities_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../json/npc/npc_personalities.json */ "./resources/js/components/json/npc/npc_personalities.json");
var _json_npc_npc_personalities_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_personalities.json */ "./resources/js/components/json/npc/npc_personalities.json", 1);
/* harmony import */ var _json_npc_npc_professions_json__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../json/npc/npc_professions.json */ "./resources/js/components/json/npc/npc_professions.json");
var _json_npc_npc_professions_json__WEBPACK_IMPORTED_MODULE_17___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_professions.json */ "./resources/js/components/json/npc/npc_professions.json", 1);
/* harmony import */ var _json_npc_npc_quirks_json__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../json/npc/npc_quirks.json */ "./resources/js/components/json/npc/npc_quirks.json");
var _json_npc_npc_quirks_json__WEBPACK_IMPORTED_MODULE_18___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_quirks.json */ "./resources/js/components/json/npc/npc_quirks.json", 1);
/* harmony import */ var _json_npc_npc_races_json__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../json/npc/npc_races.json */ "./resources/js/components/json/npc/npc_races.json");
var _json_npc_npc_races_json__WEBPACK_IMPORTED_MODULE_19___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_races.json */ "./resources/js/components/json/npc/npc_races.json", 1);
/* harmony import */ var _json_npc_npc_relationships_json__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../json/npc/npc_relationships.json */ "./resources/js/components/json/npc/npc_relationships.json");
var _json_npc_npc_relationships_json__WEBPACK_IMPORTED_MODULE_20___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_relationships.json */ "./resources/js/components/json/npc/npc_relationships.json", 1);
/* harmony import */ var _json_npc_npc_relatives_json__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../json/npc/npc_relatives.json */ "./resources/js/components/json/npc/npc_relatives.json");
var _json_npc_npc_relatives_json__WEBPACK_IMPORTED_MODULE_21___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_relatives.json */ "./resources/js/components/json/npc/npc_relatives.json", 1);
/* harmony import */ var _json_npc_npc_titles_json__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../json/npc/npc_titles.json */ "./resources/js/components/json/npc/npc_titles.json");
var _json_npc_npc_titles_json__WEBPACK_IMPORTED_MODULE_22___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_titles.json */ "./resources/js/components/json/npc/npc_titles.json", 1);
/* harmony import */ var _json_npc_npc_traits_json__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../json/npc/npc_traits.json */ "./resources/js/components/json/npc/npc_traits.json");
var _json_npc_npc_traits_json__WEBPACK_IMPORTED_MODULE_23___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_traits.json */ "./resources/js/components/json/npc/npc_traits.json", 1);
/* harmony import */ var _json_npc_npc_voices_json__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../json/npc/npc_voices.json */ "./resources/js/components/json/npc/npc_voices.json");
var _json_npc_npc_voices_json__WEBPACK_IMPORTED_MODULE_24___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../json/npc/npc_voices.json */ "./resources/js/components/json/npc/npc_voices.json", 1);

























/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      gen_appearances: _json_npc_npc_appearances_json__WEBPACK_IMPORTED_MODULE_0__,
      gen_blessings: _json_npc_npc_blessings_json__WEBPACK_IMPORTED_MODULE_1__,
      gen_bonds: _json_npc_npc_bonds_json__WEBPACK_IMPORTED_MODULE_2__,
      gen_city_poi: _json_npc_npc_city_points_of_interest_json__WEBPACK_IMPORTED_MODULE_3__,
      gen_curses: _json_npc_npc_curses_json__WEBPACK_IMPORTED_MODULE_4__,
      gen_destinations: _json_npc_npc_destinations_json__WEBPACK_IMPORTED_MODULE_5__,
      gen_details: _json_npc_npc_details_json__WEBPACK_IMPORTED_MODULE_6__,
      gen_entities: _json_npc_npc_entities_json__WEBPACK_IMPORTED_MODULE_7__,
      gen_flaws: _json_npc_npc_flaws_json__WEBPACK_IMPORTED_MODULE_8__,
      gen_gods: _json_npc_npc_gods_json__WEBPACK_IMPORTED_MODULE_9__,
      gen_hooks: _json_npc_npc_hooks_json__WEBPACK_IMPORTED_MODULE_10__,
      gen_ideals: _json_npc_npc_ideals_json__WEBPACK_IMPORTED_MODULE_11__,
      gen_items: _json_npc_npc_items_json__WEBPACK_IMPORTED_MODULE_12__,
      gen_life_events: _json_npc_npc_life_events_json__WEBPACK_IMPORTED_MODULE_13__,
      gen_motivations: _json_npc_npc_motivations_json__WEBPACK_IMPORTED_MODULE_14__,
      gen_obsessions: _json_npc_npc_obsessions_json__WEBPACK_IMPORTED_MODULE_15__,
      gen_personalities: _json_npc_npc_personalities_json__WEBPACK_IMPORTED_MODULE_16__,
      gen_professions: _json_npc_npc_professions_json__WEBPACK_IMPORTED_MODULE_17__,
      gen_quirks: _json_npc_npc_quirks_json__WEBPACK_IMPORTED_MODULE_18__,
      gen_races: _json_npc_npc_races_json__WEBPACK_IMPORTED_MODULE_19__,
      gen_relationships: _json_npc_npc_relationships_json__WEBPACK_IMPORTED_MODULE_20__,
      gen_relatives: _json_npc_npc_relatives_json__WEBPACK_IMPORTED_MODULE_21__,
      gen_titles: _json_npc_npc_titles_json__WEBPACK_IMPORTED_MODULE_22__,
      gen_traits: _json_npc_npc_traits_json__WEBPACK_IMPORTED_MODULE_23__,
      gen_voices: _json_npc_npc_voices_json__WEBPACK_IMPORTED_MODULE_24__,
      CLASSES: ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"],
      LANGUAGES: ["Abyssal", "Aquan", "Auran", "Celestial", "Draconic", "Druidic", "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Halfling", "Infernal", "Orc", "Primordial", "Sylvan", "Undercommon", "Thieves Cant"],
      SKILLS: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
      ALIGNMENTS: ["LG", "NG", "CG", "LN", "TN", "CN", "LE", "NE", "CE"],
      RACES: []
    };
  },
  mounted: function mounted() {
    this.parseRACES();
  },
  methods: {
    parseRACES: function parseRACES() {
      var k = 0;

      for (var i = 0; i < this.gen_races.races.length; i++) {
        this.RACES.push({
          name: this.gen_races.races[i].name,
          parent_race_index: i,
          subrace_index: null,
          index: k
        });
        k++;

        if (this.gen_races.races[i].subraces) {
          for (var j = 0; j < this.gen_races.races[i].subraces.length; j++) {
            this.RACES.push({
              name: this.gen_races.races[i].subraces[j].name,
              parent_race_index: i,
              subrace_index: j,
              index: k
            });
            k++;
          }
        }
      }
    },
    getAppearance: function getAppearance() {
      var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'f';
      var output_no_facial_hair = "{{body-general}} figure with {{skin-color}}, {{skin-type}} skin; {{eyes-general}} {{eyes-color}} eyes and {{eyebrows}} eyebrows set on a {{face-general}} face with a {{nose}} nose, and {{mouth}}; {{hair-general}} {{hair-color}} hair; and {{hands}} hands. Extra: {{misc}}";
      var output_facial_hair = "{{body-general}} figure with {{skin-color}}, {{skin-type}} skin; {{eyes-general}} {{eyes-color}} eyes and {{eyebrows}} eyebrows set on a {{face-general}} face with a {{nose}} nose, {{mouth}} and {{facial-hair}}; {{hair-general}} {{hair-color}} hair; and {{hands}} hands. Extra: {{misc}}";
      var output = s === 'M' ? output_facial_hair : output_no_facial_hair; //Selects all instances of "{{...}}" including brackets

      var regex_inclusive = /({{)([^{\]]*)(}})/g;

      var _this = this; //Loop through and replace all instances of "{{attribute}}"


      return output.replace(regex_inclusive, function (selectionWithBrackets) {
        //get the value between the opening and closing brackets
        var attribute = selectionWithBrackets.substr(2, selectionWithBrackets.length - 4); //assign json with list of attribute values

        var json = _this.gen_appearances.appearances[attribute]; //get a random attribute value

        var v = json[_this.getRandomNumber(json.length)];

        return attribute === 'body-general' ? _this.capitalize(v) : v;
      });
    },
    getBlessing: function getBlessing() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_blessings.blessings, i);
    },
    getBond: function getBond() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_bonds.bonds, i);
    },
    getCityPOI: function getCityPOI() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_city_poi["city-points-of-interest"], i);
    },
    getCurse: function getCurse() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_curses.curses, i);
    },
    getDestination: function getDestination() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_destinations.destinations, i);
    },
    getDetail: function getDetail() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_details.details, i);
    },
    getEntity: function getEntity() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_entities.entities, i);
    },
    getFlaw: function getFlaw() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_flaws.flaws, i);
    },
    getGod: function getGod() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_gods.gods, i);
    },
    getHook: function getHook() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_hooks.hooks, i);
    },
    getIdeal: function getIdeal() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_ideals.ideals, i);
    },
    getItem: function getItem() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_items.items, i);
    },
    getLifeEvent: function getLifeEvent() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_life_events["life-events"], i);
    },
    getMotivation: function getMotivation() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_motivations.motivations, i);
    },
    getObsession: function getObsession() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_obsessions.obsessions, i);
    },
    getPersonality: function getPersonality() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_personalities.personalities, i);
    },
    getProfession: function getProfession() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_professions.professions, i);
    },
    getQuirk: function getQuirk() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_quirks.quirks, i);
    },
    getRaceIdRare: function getRaceIdRare() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_races["races-rare"], i);
    },
    getRaceIdUncommon: function getRaceIdUncommon() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_races["races-uncommon"], i);
    },
    getRaceIdCommon: function getRaceIdCommon() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_races["races-common"], i);
    },
    getRace: function getRace() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_races.races, i);
    },
    getRelationship: function getRelationship() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_relationships.relationships, i);
    },
    getRelative: function getRelative() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_relatives.relatives, i);
    },
    getTitle: function getTitle() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_titles.titles, i);
    },
    getTrait: function getTrait() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_traits.traits, i);
    },
    getVoice: function getVoice() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return this.getValue(this.gen_voices.voices, i);
    },
    generateRandomNPC: function generateRandomNPC() {
      var npc = {};
      npc.name = "";
      this.getClass(npc);
      npc.hp = 10;
      npc.inventory = this.getItem();
      this.setupRace(npc);
      npc.racials = this.getRacialsFromRace(npc);
      npc.languages = this.getLanguagesFromRace(npc);
      npc.sex = this.getSex(npc);
      npc.name = this.getName(npc);
      npc.alignment_int = this.getRandomNumber(this.ALIGNMENTS.length);
      npc.alignment = this.ALIGNMENTS[npc.alignment_int];
      npc.asi = [8, 8, 8, 8, 8, 8];
      this.getASIs(npc, 'roll');
      npc.level = 0;
      npc.skills = this.getSkills();
      npc.attacks_abilities = "";
      npc.misc = "";
      this.getAge(npc);
      npc.appearance = this.getAppearance(npc.sex);
      npc.bond = this.getBond();
      npc.detail = this.getDetail();
      npc.flaw = this.getFlaw();
      npc.hook = this.getHook();
      npc.ideal = this.getIdeal();
      npc.life_event = this.getLifeEvent();
      npc.motivation = this.getMotivation();
      npc.personality = this.getPersonalityFull();
      npc.profession = this.getProfession();
      npc.quirk = this.getQuirk();
      npc.relationship = this.getRelationship();
      npc.trait = this.getTrait();
      npc.voice = this.getVoice();
      npc.worship_habit = this.getWorshipHabit();
      npc.summary = this.getDefaultSummary(npc);
      return npc;
    },
    getClass: function getClass(npc) {
      npc.class_int = this.getRandomNumber(this.CLASSES.length);
      npc.class = this.CLASSES[npc.class_int];
      npc.class_other = null;
    },
    getAge: function getAge(npc) {
      npc.age_int = this.getRandomNumber(95) + 5;
      npc.age = this.getAgeDescriptive(npc.age_int);
    },
    getAgeDescriptive: function getAgeDescriptive(age) {
      var ageDescriptive;

      if (age < 10) {
        ageDescriptive = "Child";
      } else if (age < 18) {
        ageDescriptive = "Youth";
      } else if (age < 25) {
        ageDescriptive = "Young Adult";
      } else if (age < 50) {
        ageDescriptive = "Prime Adult";
      } else if (age < 75) {
        ageDescriptive = "Older Adult";
      } else if (age < 90) {
        ageDescriptive = "Elderly";
      } else if (age < 99) {
        ageDescriptive = "Very Old";
      } else {
        ageDescriptive = "On their death bed";
      }

      return ageDescriptive + " (" + age + " percent of their life)";
    },
    setupRace: function setupRace(npc) {
      var raceId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var rarity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      //If we don't have a raceId supplied to us then get a random race
      if (!raceId) {
        if (rarity) {
          //rarity: 0=common, 1=uncommon, 2=rare, 3=any - equally weighted
          if (rarity === 0) {
            raceId = this.getRaceIdCommon();
          } else if (rarity === 1) {
            raceId = this.getRaceIdUncommon();
          } else if (rarity === 2) {
            raceId = this.getRaceIdRare();
          } else {
            raceId = this.getRandomNumber(this.gen_races.races.length);
          }
        } else {
          //Randomly choose a number between 0 and 99 to choose race based off of rarity
          var raceRand = this.getRandomNumber(100);

          if (raceRand < 5) {
            raceId = this.getRaceIdRare();
          } else if (raceRand < 30) {
            raceId = this.getRaceIdUncommon();
          } else {
            raceId = this.getRaceIdCommon();
          }
        }
      }

      var race = this.getRace(raceId);
      npc.race_raw = race;
      npc.race_other = null;
      npc.size = race.size; //We can check whether the sex can be male/female or N/A if the race has male/female names or not

      npc.speed = race.speed ? parseInt(race.speed) : 0;
      npc.speed_fly = race["speed-fly"] ? parseInt(race["speed-fly"]) : 0;
      npc.speed_swim = race["speed-swim"] ? parseInt(race["speed-swim"]) : 0;
      npc.asi_racial_mods = race.asi ? race.asi : [0, 0, 0, 0, 0, 0];
      npc.race = race.name;
      npc.source = race.source;

      if (race.subraces) {
        //1 in 3 chance to select subrace instead of basic race
        if (this.getRandomNumber(3) === 0) {
          var subrace = race.subraces[this.getRandomNumber(race.subraces.length)];
          npc.race = subrace.name; //Merge speeds if the subrace has any

          if (subrace.speed) {
            npc.speed += parseInt(subrace.speed);
          }

          if (subrace.speed_fly) {
            npc.speed_fly += parseInt(subrace.speed_fly);
          }

          if (subrace.speed_swim) {
            npc.speed_swim += parseInt(subrace.speed_swim);
          } //Merge ASI's if the subrace has any


          if (subrace.asi) {
            for (var i = 0; i < 6; i++) {
              npc.asi_racial_mods[i] += subrace.asi[i];
            }
          } //override the race's source if the subrace has one


          if (subrace.source) {
            npc.source = subrace.source;
          }
        }
      }

      npc.race_id = this.gen_races["races-all"].indexOf(npc.race);
    },
    getSpeedFromRace: function getSpeedFromRace(npc) {
      var speed;

      if (npc.race_other === null) {
        speed = npc.race_raw.speed;

        if (npc.race !== npc.race_raw.name) {
          for (var i = 0; i < npc.race_raw.subraces.length; i++) {
            if (npc.race === npc.race_raw.subraces[i].name) {
              if (npc.race_raw.subraces[i].speed) {
                speed = npc.race_raw.subraces[i].speed;
              }

              break;
            }
          }
        }
      }

      return speed ? speed : 30;
    },
    getSpeedFlyFromRace: function getSpeedFlyFromRace(npc) {
      var speed;

      if (npc.race_other === null) {
        speed = npc.race_raw["speed-fly"];

        if (npc.race !== npc.race_raw.name) {
          for (var i = 0; i < npc.race_raw.subraces.length; i++) {
            if (npc.race === npc.race_raw.subraces[i].name) {
              if (npc.race_raw.subraces[i]["speed-fly"]) {
                speed = npc.race_raw.subraces[i]["speed-fly"];
              }

              break;
            }
          }
        }
      }

      return speed ? speed : 0;
    },
    getSpeedSwimFromRace: function getSpeedSwimFromRace(npc) {
      var speed;

      if (npc.race_other === null) {
        speed = npc.race_raw["speed-swim"];

        if (npc.race !== npc.race_raw.name) {
          for (var i = 0; i < npc.race_raw.subraces.length; i++) {
            if (npc.race === npc.race_raw.subraces[i].name) {
              if (npc.race_raw.subraces[i]["speed-swim"]) {
                speed = npc.race_raw.subraces[i]["speed-swim"];
              }

              break;
            }
          }
        }
      }

      return speed ? speed : 0;
    },
    getSex: function getSex(npc) {
      var sexes = ['M', 'F', 'N/A'];

      if (npc.race_raw) {
        if (npc.race_raw.names.male) {
          return sexes[this.getRandomNumber(2)];
        } else {
          return sexes[2];
        }
      } else {
        return sexes[this.getRandomNumber(3)];
      }
    },
    getName: function getName(npc) {
      var name;

      if (npc.race_raw) {
        if (npc.race_raw.names.male) {
          var s;
          s = npc.sex ? npc.sex : this.getRandomNumber(2);

          if (s === 0) {
            name = npc.race_raw.names.male ? npc.race_raw.names.male[this.getRandomNumber(npc.race_raw.names.male.length)] : "";
          } else {
            name = npc.race_raw.names.female ? npc.race_raw.names.female[this.getRandomNumber(npc.race_raw.names.female.length)] : "";
          }

          if (npc.race_raw.names.last) {
            name += " " + npc.race_raw.names.last[this.getRandomNumber(npc.race_raw.names.last.length)];
          } //We don't want to give their name a title if they already have a title-style name


          if (name.toLowerCase().indexOf(' the ') === -1) {
            name += this.getTitleChance(25);
          }
        } else if (npc.race_raw.names.simple) {
          name = npc.race_raw.names.simple ? npc.race_raw.names.simple[this.getRandomNumber(npc.race_raw.names.simple.length)] : ""; //We don't want to give their name a title if they already have a title-style name

          if (name.toLowerCase().indexOf(' the ') === -1) {
            name += this.getTitleChance(25);
          }
        }
      } else {
        name = "Please Set NPC Race First";
      }

      return name;
    },
    getTitleChance: function getTitleChance(i) {
      //1 in i chance of having a title
      if (this.getRandomNumber(i) === 0) {
        return " " + this.getTitle();
      }

      return "";
    },
    getPersonalityFull: function getPersonalityFull() {
      var p1 = this.getPersonality(); //prevent duplicate personalities

      var p2 = this.getPersonality();

      while (p2 === p1) {
        p2 = this.getPersonality();
      } //prevent duplicate personalities


      var p3 = this.getPersonality();

      while (p3 === p1 || p3 === p2) {
        p3 = this.getPersonality();
      }

      return p1 + ", " + p2 + ", and " + p3;
    },
    getWorshipHabit: function getWorshipHabit() {
      var advs = ["secretly worships", "discretely worships", "proudly worships", "loudly worships", "claims to, but doesn't actually worship", "zealously worships"];
      return this.capitalize(this.getValue(advs) + " " + this.getGod());
    },
    getRacialsFromRace: function getRacialsFromRace(npc) {
      var racials = [];

      if (npc.race_other === null) {
        racials = racials.concat(npc.race_raw.extras);

        if (npc.race !== npc.race_raw.name) {
          for (var i = 0; i < npc.race_raw.subraces.length; i++) {
            if (npc.race === npc.race_raw.subraces[i].name) {
              if (npc.race_raw.subraces[i].extras) {
                racials = racials.concat(npc.race_raw.subraces[i].extras);
              }

              break;
            }
          }
        }
      }

      return racials.join(", ");
    },
    getLanguagesFromRace: function getLanguagesFromRace(npc) {
      var languages = [];

      if (npc.race_other === null) {
        languages = languages.concat(npc.race_raw.languages);

        if (npc.race !== npc.race_raw.name) {
          for (var i = 0; i < npc.race_raw.subraces.length; i++) {
            if (npc.race === npc.race_raw.subraces[i].name) {
              if (npc.race_raw.subraces[i].languages) {
                languages = languages.concat(npc.race_raw.subraces[i].languages);
              }

              break;
            }
          }
        }
      }

      for (var _i = 0; _i < languages.length; _i++) {
        if (languages[_i].indexOf('+') !== -1) {
          var l = this.getLanguage();
          var j = 0; //prevent possible infinite loops

          while (languages.indexOf(l) !== -1 && j < 100) {
            l = this.getLanguage();
            j++;
          }

          if (j < 100) {
            languages[_i] = l;
          }
        }
      }

      return languages.join(", ");
    },
    getLanguage: function getLanguage() {
      return this.LANGUAGES[this.getRandomNumber(this.LANGUAGES.length)];
    },
    getSkills: function getSkills(count) {
      count = count ? count : 3;
      var skills = [];

      for (var i = 0; i < count; i++) {
        var s = this.getSkill();
        var j = 0;

        while (skills.indexOf(s) !== -1 && j < 100) {
          s = this.getSkill();
          j++;
        }

        if (j < 100) {
          skills.push(s);
        }
      }

      return skills.join(", ");
    },
    getSkill: function getSkill() {
      return this.SKILLS[this.getRandomNumber(this.SKILLS.length)];
    },
    getValue: function getValue(json) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var v; //If we received an index then retrieve that value, otherwise get a random value

      if (i >= 0) {
        v = json[i];
      } else {
        v = json[this.getRandomNumber(json.length)];
      } //Selects all instances of "{{...}}" including brackets


      var regex_inclusive = /({{)([^{\]]*)(}})/g; //let regex_exclusive = /(?<={{)([^{\]]*)(?=}})/g; //No brackets selected

      var _this = this; //if we aren't left with a string then return the object


      if (typeof v !== 'string') {
        return v;
      } //OTHERWISE
      //Loop through and replace all instances of "{{attribute}}"
      //replacing it with the result of a call to this.getAttribute()


      return v.replace(regex_inclusive, function (selectionWithBrackets) {
        //get the value between the opening and closing brackets
        var noBrackets = selectionWithBrackets.substr(2, selectionWithBrackets.length - 4); //function name = "get" + capitalized property, eg getCurse()

        var funcName = 'get' + _this.capitalize(noBrackets); //return the result of a call to get a random attribute, this may result in recursion


        return _this[funcName]();
      });
    },
    getASI: function getASI(npc, i) {
      var rolls = []; //Roll 4 6-sided dice

      rolls.push(this.getRandomNumber(6) + 1);
      rolls.push(this.getRandomNumber(6) + 1);
      rolls.push(this.getRandomNumber(6) + 1);
      rolls.push(this.getRandomNumber(6) + 1); //Sort highest to lowest

      rolls.sort(function (a, b) {
        return b - a;
      }); //Drop lowest roll

      rolls.pop(); //Return sum of remaining rolls

      var racialMod = 0;

      if (i !== undefined && npc && npc.asi_racial_mods) {
        racialMod = npc.asi_racial_mods[i] ? npc.asi_racial_mods[i] : 0;
      } //Add together all rolls in array then add the corresponding racial mod, if any


      return rolls.reduce(function (a, b) {
        return a + b;
      }, 0) + racialMod;
    },
    getASIs: function getASIs(npc, method) {
      if (method === 'roll') {
        for (var i = 0; i < 6; i++) {
          this.$set(npc.asi, i, this.getASI(npc, i));
        }
      } else {
        var standards = this.shuffle_array([15, 14, 13, 12, 10, 8]);

        for (var _i2 = 0; _i2 < 6; _i2++) {
          var racialMod = 0;

          if (npc && npc.asi_racial_mods) {
            racialMod = npc.asi_racial_mods[_i2] ? npc.asi_racial_mods[_i2] : 0;
          }

          this.$set(npc.asi, _i2, standards[_i2] + racialMod);
        }
      }
    },
    getDefaultSummary: function getDefaultSummary(npc) {
      return npc.name + " - " + npc.personality;
    },
    shuffle_array: function shuffle_array(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [a[j], a[i]];
        a[i] = _ref[0];
        a[j] = _ref[1];
      }

      return a;
    },
    capitalize: function capitalize(s) {
      return s[0].toUpperCase() + s.substring(1);
    },
    getRandomNumber: function getRandomNumber(max) {
      //get random number between 0 and max-1 inclusive
      return Math.floor(Math.random() * Math.floor(max));
    },
    parseNPCFromServerData: function parseNPCFromServerData(n) {
      var npc = {};
      npc.name = n.name;

      if (n.class_other === null) {
        npc.class_int = n.class;
        npc.class = this.CLASSES[n.class];
        npc.class_other = null;
      } else {
        npc.class = null;
        npc.class_other = n.class_other;
      }

      if (n.race_other === null) {
        npc.race_int = n.race;
        npc.race = this.gen_races["races-all"][n.race];
        npc.race_other = null;
        npc.race_raw = this.getRace(n.race_int);
      } else {
        npc.race = null;
        npc.race_other = n.race_other;
      }

      npc.age_int = n.age;
      npc.age = this.getAgeDescriptive(n.age);
      npc.hp = n.hp;
      npc.inventory = n.inventory;
      npc.speed = n.speed;
      npc.speed_fly = n.speed_fly;
      npc.speed_swim = n.speed_swim;
      npc.racials = n.racials;
      npc.languages = n.languages;
      npc.size = n.size;
      npc.sex = n.sex;
      npc.alignment_int = n.alignment;
      npc.alignment = n.alignment ? this.ALIGNMENTS[n.alignment] : null;
      npc.asi = [n.attr_str, n.attr_dex, n.attr_con, n.attr_int, n.attr_wis, n.attr_cha];
      npc.level = n.level;
      npc.skills = n.skills;
      npc.attacks_abilities = n.attacks_abilities;
      npc.misc = n.misc;
      npc.appearance = n.appearance;
      npc.bond = n.bond;
      npc.detail = n.detail;
      npc.flaw = n.flaw;
      npc.hook = n.hook;
      npc.ideal = n.ideal;
      npc.life_event = n.life_event;
      npc.motivation = n.motivation;
      npc.personality = n.personality;
      npc.profession = n.profession;
      npc.quirk = n.quirk;
      npc.relationship = n.relationship;
      npc.trait = n.trait;
      npc.voice = n.voice;
      npc.worship_habit = n.worship_habit;
      npc.summary = n.summary;
      return npc;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    npc: Object
  },
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_edit.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_edit.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPC_GEN_DATA.vue */ "./resources/js/components/npcs/NPC_GEN_DATA.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: {
    npc: Object
  },
  data: function data() {
    return {
      new_npc: window.clone(this.npc)
    };
  },
  methods: {
    saveChanges: function saveChanges() {
      this.$emit('saveChanges', this.new_npc);
    },
    revertChanges: function revertChanges() {
      this.new_npc = this.npc;
    },
    randomize: function randomize() {
      this.new_npc = this.generateRandomNPC();
    },
    stopEditing: function stopEditing() {
      this.$emit('stopEditing');
    },
    onRaceChange: function onRaceChange(r) {
      for (var i = 0; i < this.RACES.length; i++) {
        if (this.RACES[i].name === r) {
          this.new_npc.race_raw = this.getRace(this.RACES[i].parent_race_index);
          break;
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_generator.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_generator.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPC_GEN_DATA.vue */ "./resources/js/components/npcs/NPC_GEN_DATA.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function (_fromNow) {
      function fromNow(_x) {
        return _fromNow.apply(this, arguments);
      }

      fromNow.toString = function () {
        return _fromNow.toString();
      };

      return fromNow;
    }(function (v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return fromNow(v);
    }),
    nl2br: function nl2br(t) {
      return t.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  },
  extends: _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: {
    data: Object
  },
  data: function data() {
    return {
      npc: null,
      editing: false
    };
  },
  mounted: function mounted() {
    this.randomize();
  },
  methods: {
    randomize: function randomize() {
      this.npc = this.generateRandomNPC();
    },
    saveNPCToMine: function saveNPCToMine() {
      this.$emit('onSaveNPCToMine', this.npc);
      this.npc = this.generateRandomNPC();
    },
    saveChanges: function saveChanges(new_npc) {
      this.npc = new_npc;
      this.editing = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_view.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_view.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    npc: Object
  },
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npcs.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npcs.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventbus_EventBus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventbus/EventBus.js */ "./resources/js/components/eventbus/EventBus.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function (_fromNow) {
      function fromNow(_x) {
        return _fromNow.apply(this, arguments);
      }

      fromNow.toString = function () {
        return _fromNow.toString();
      };

      return fromNow;
    }(function (v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return fromNow(v);
    })
  },
  props: {
    data: Object
  },
  data: function data() {
    return {
      activeTab: 'gen',
      base_url: BASE_URL,
      LOGGED_IN: LOGGED_IN
    };
  },
  mounted: function mounted() {
    //Listen for the back and forward buttons of the browser
    var _this = this;

    window.addEventListener('popstate', function (event) {
      if (history.state) {
        //If we've pushed to the history then act appropriately depending on the state's id
        _this.onNavigate(history.state.id);
      } else {
        //otherwise use the default function
        window.history.back();
      }
    }, false); //Check if we get an NPC's data from the server from the url

    if (URL_NPC) {
      //We got an NPC so show it
      //this.currNPC = this.preFormatNPC(URL_NPC);
      //this.showingNPC=true;
      //Push new url to history, so the user can click back from here and get to a list of other posts
      history.pushState({
        id: this.base_url
      }, null, this.base_url);
      history.pushState({
        id: this.base_url + '/' + URL_NPC.id
      }, null, this.base_url + '/' + URL_NPC.id);
    }

    if (window.location.hash == '#new') {
      history.replaceState({
        id: '/'
      }, null, this.base_url);
      history.pushState({
        id: 'new_npc'
      }, null, this.base_url + '#new');
      this.showingNewNPC = true;
    }
  },
  methods: {
    changeTab: function changeTab(t) {
      if (t === 'mine' && !LOGGED_IN) {
        _eventbus_EventBus_js__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$emit('showLogin', 'Log in to view saved NPCs');
        return;
      }

      this.activeTab = t;
    },
    saveNPCToMine: function saveNPCToMine(npc) {
      if (!LOGGED_IN) {
        _eventbus_EventBus_js__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$emit('showLogin', 'Log in to save NPCs');
        return;
      }

      this.$refs.tab_mine.saveNewNPC(npc);
      this.changeTab('mine');
    },
    onNavigate: function onNavigate(deprecated_id) {//Look at the url to determine what to show/hide

      /*
                   if (window.location.hash == '#new') {
                       //Show the new post modal if #new is in the url
                       this.clearNewPost();
                       this.showingNewPost=true;
                   }
                   else if (window.location.href == this.base_url) {
                       //if we are at the base url then hide any posts or new post modals
                       this.currPost=null;
                       this.showingNewPost=false;
                       this.clearNewPost();
                   }
                   else {
                       //get the id of the post to show by stripping the last entry from the end of the url, that is the id
                       var path = window.location.pathname;
                       var ar = path.split('/');
                       var id = parseInt(ar[ar.length-1]);
                       this.viewPostById(id);
                   }
                   */
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Public_Npcs.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Public_Npcs.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPC_GEN_DATA.vue */ "./resources/js/components/npcs/NPC_GEN_DATA.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    fromNow: function (_fromNow) {
      function fromNow(_x) {
        return _fromNow.apply(this, arguments);
      }

      fromNow.toString = function () {
        return _fromNow.toString();
      };

      return fromNow;
    }(function (v) {
      /*
      if (moment(v).isValid()) {
      	return moment(v + 'Z', 'YYYY-MM-DD HH:mm:ssZ').fromNow(); //'Z' converts to local time zone
      }
      return v;
      */
      return fromNow(v);
    }),
    nl2br: function nl2br(t) {
      return t.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  },
  extends: _NPC_GEN_DATA_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  props: [],
  data: function data() {
    return {
      public_npcs: [],
      curr_npc: false,
      pageNum: 0,
      filterByMethod: 0,
      sortByMethod: 0,
      sortByRandomSeed: Math.floor(Math.random() * 1000000),
      SORT_BY_METHODS: ["r", "uv", "dv", "dd", "da"],
      cachedPosts: [[[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []]],
      cachedPageNums: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      noMoreNPCs: false,
      prefetchedNPCs: []
    };
  },
  mounted: function mounted() {//this.getNPCs();
  },
  methods: {
    getNPCs: function getNPCs() {
      //If there aren't any prefetched NPCs then get some posts
      if (this.prefetchedNPCs.length === 0) {
        this.fetchPublicNPCs(true);
      } else {
        //We've already prefetched some NPCs, so add those to our NPCs array, then prefetch more
        while (this.prefetchedNPCs.length) {
          this.posts.push(this.prefetchedNPCs.shift());
        }

        this.fetchPublicNPCs(false);
      }
    },
    fetchPublicNPCs: function fetchPublicNPCs(alsoPrefetch) {
      var _this = this;

      axios.post(GET_PUBLIC_NPCS_URL, {
        page: this.pageNum,
        filter: this.filterByMethod,
        method: this.SORT_BY_METHODS[this.sortByMethod],
        seed: this.sortByRandomSeed
      }, config).then(function (response) {
        if (response.data.npcs && response.data.npcs.length === 0 && alsoPrefetch === false) {
          //No new npcs
          _this.noMoreNPCs = true; //TODO alert user somehow (other than hiding the "Load More" button)?

          return;
        } //Increment page num to keep track of sql pagination


        _this.pageNum += 1; //If this is the first time we're getting NPCs, then do some initializing

        if (_this.public_npcs == null) {
          _this.public_npcs = [];

          if (URL_POST) {
            //Do we have a post's data provided by the server? If so, add it as the first post before adding newly fetched NPCs
            _this.public_npcs.push(_this.preFormatPost(URL_POST));
          }
        } //Loop through NPCs retrieved from the server, append some client side vars then add to our current NPCs array


        while (response.data.npcs.length) {
          //If we happen to come across our url provided post then don't add it to the list, because we already have it

          /*
                            if (URL_NPC && response.data.npcs[0].id === URL_POST.id) {
                                let found=false;
                                for (let i=0; i<_this.public_npcs.length; i++) {
                                    if (_this.public_npcs[i].id === response.data.npcs[0].id) {
                                        found=true;
                                        break;
                                    }
                                }
                                if (found) {
                                    continue;
                                }
                            }
                            */
          if (alsoPrefetch) {
            //transfer it to our current array of npcs
            _this.public_npcs.push(response.data.npcs.shift());
          } else {
            //transfer it to our prefetched array
            _this.prefetchedNPCs.push(response.data.npcs.shift());
          }
        } //If we're immediately showing these npcs, then prefetch more npcs for next time


        if (alsoPrefetch) {
          _this.fetchPublicNPCs(false);
        }
      }).catch(function (error) {
        //TODO handle error
        console.log('catch error');
        console.log(error.response);
      });
    },
    changeSortMethod: function changeSortMethod(sbm, event) {
      sbm = event.target.value;

      if (this.sortByMethod === sbm) {
        //No Change in sort method
        return;
      } //Cache the current posts and page num for faster reloading if they come back to this sort/filter method combination
      //But make sure we don't cache "saved" posts as they might save/unsave


      if (this.filterByMethod !== 3) {
        this.cachedPosts[this.sortByMethod][this.filterByMethod] = clone(this.posts);
        this.cachedPageNums[this.sortByMethod][this.filterByMethod] = this.pageNum;
      } //Update our sort by method


      this.sortByMethod = sbm; //Clear out our prefetched NPCs

      this.prefetchedNPCs = []; //Reset this flag so it shows the "Load More" button in case it was hidden

      this.noMoreNPCs = false; //Check if a cache of posts already exists for this new sort method, but not if they're looking up "saved" posts

      if (this.cachedPosts[sbm][this.filterByMethod].length > 0 && this.filterByMethod !== 3) {
        this.pageNum = this.cachedPageNums[sbm][this.filterByMethod];
        this.posts = this.cachedPosts[sbm][this.filterByMethod];
        this.$set(this.posts, 0, this.cachedPosts[sbm][this.filterByMethod][0]);
      } else {
        this.posts = [];
        this.pageNum = 0;
        this.loadMore();
      }
    },
    changeFilterMethod: function changeFilterMethod(fbm, event) {
      fbm = event.target.value;

      if (this.filterByMethod === fbm) {
        //No Change in filter method
        return;
      } //Cache the current posts and page num for faster reloading if they come back to this sort/filter method combination


      this.cachedPosts[this.sortByMethod][this.filterByMethod] = clone(this.posts);
      this.cachedPageNums[this.sortByMethod][this.filterByMethod] = this.pageNum; //Update our filter by method

      this.filterByMethod = fbm; //Clear out our prefetched NPCs

      this.prefetchedNPCs = []; //Reset this flag so it shows the "Load More" button in case it was hidden

      this.noMoreNPCs = false; //Check if a cache of posts already exists for this new filter method

      if (this.cachedPosts[this.sortByMethod][fbm].length > 0) {
        this.pageNum = this.cachedPageNums[this.sortByMethod][fbm];
        this.public_npcs = this.cachedPosts[this.sortByMethod][fbm];
        this.$set(this.posts, 0, this.cachedPosts[this.sortByMethod][fbm][0]);
      } else {
        this.public_npcs = [];
        this.pageNum = 0;
        this.loadMore();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "modal",
      class: { "is-active": _vm.showingModal },
      attrs: { id: "login__modal" }
    },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function($event) {
            return _vm.hideLoginModal()
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-content" }, [
        _c("div", { staticClass: "has-text-centered login-container" }, [
          _c(
            "div",
            {
              staticClass: "column login-tab",
              class: { active: _vm.activeTab === "l" },
              attrs: { id: "login__modal__login" }
            },
            [
              _c("div", { staticClass: "box" }, [
                _c(
                  "div",
                  { staticClass: "modal__title", attrs: { id: "login-title" } },
                  [_vm._v(_vm._s(_vm.loginTitle))]
                ),
                _vm._v(" "),
                _vm._m(0),
                _vm._v(" "),
                _c("form", [
                  _c("div", {
                    staticClass: "error-field",
                    staticStyle: { display: "none" },
                    attrs: { id: "login-email-error" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("div", { staticClass: "control" }, [
                      _c("input", {
                        staticClass: "input is-large",
                        attrs: {
                          id: "login-email",
                          type: "email",
                          placeholder: "Email",
                          autofocus: "",
                          model: _vm.lEmail
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "error-field",
                    staticStyle: { display: "none" },
                    attrs: { id: "login-password-error" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("div", { staticClass: "control" }, [
                      _c("input", {
                        staticClass: "input is-large",
                        attrs: {
                          id: "login-password",
                          type: "password",
                          placeholder: "Password",
                          model: _vm.lPassword
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._m(1),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.loginError.length,
                          expression: "loginError.length"
                        }
                      ],
                      staticClass: "error-field",
                      attrs: { id: "login-error" }
                    },
                    [_vm._v(_vm._s(_vm.loginError))]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "button is-block is-info is-large is-fullwidth",
                      class: { busy: _vm.ajaxing },
                      attrs: { id: "login-btn" },
                      on: {
                        click: function($event) {
                          return _vm.login()
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "btn-normal-div" }, [
                        _vm._v("Login")
                      ]),
                      _vm._v(" "),
                      _vm._m(2)
                    ]
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "p",
                {
                  staticClass:
                    "login__modal__footer has-text-grey column is-8 is-offset-2"
                },
                [
                  _c(
                    "a",
                    {
                      on: {
                        click: function($event) {
                          return _vm.loginModalChangeTab("r")
                        }
                      }
                    },
                    [_vm._v("Sign Up")]
                  ),
                  _vm._v("  · \n\t\t\t\t\t"),
                  _c("a", { attrs: { href: "../" } }, [
                    _vm._v("Forgot Password")
                  ]),
                  _vm._v("  · \n\t\t\t\t\t"),
                  _c("a", { attrs: { href: "../" } }, [_vm._v("Need Help?")])
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "column login-tab",
              class: { active: _vm.activeTab === "r" },
              attrs: { id: "login__modal__register" }
            },
            [
              _c("div", { staticClass: "box" }, [
                _c("div", { staticClass: "modal__title" }, [
                  _vm._v("Create an Account")
                ]),
                _vm._v(" "),
                _vm._m(3),
                _vm._v(" "),
                _c("form", [
                  _c("div", {
                    staticClass: "error-field",
                    staticStyle: { display: "none" },
                    attrs: { id: "register-username-error" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("div", { staticClass: "control" }, [
                      _c("input", {
                        staticClass: "input is-large",
                        attrs: {
                          id: "register-username",
                          type: "text",
                          placeholder: "Username",
                          autofocus: "",
                          model: _vm.rUsername
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "error-field",
                    staticStyle: { display: "none" },
                    attrs: { id: "register-email-error" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("div", { staticClass: "control" }, [
                      _c("input", {
                        staticClass: "input is-large",
                        attrs: {
                          id: "register-email",
                          type: "email",
                          placeholder: "Email",
                          model: _vm.rEmail
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "error-field",
                    staticStyle: { display: "none" },
                    attrs: { id: "register-password-error" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("div", { staticClass: "control" }, [
                      _c("input", {
                        staticClass: "input is-large",
                        attrs: {
                          id: "register-password",
                          type: "password",
                          placeholder: "Password",
                          model: _vm.rPassword
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("div", { staticClass: "control" }, [
                      _c("input", {
                        staticClass: "input is-large",
                        attrs: {
                          id: "register-password-confirm",
                          type: "password",
                          placeholder: "Confirm Password",
                          model: _vm.rPassword2
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._m(4),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "error-field",
                    staticStyle: { display: "none" },
                    attrs: { id: "register-error" }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "button is-block is-info is-large is-fullwidth",
                      class: { busy: _vm.ajaxing },
                      attrs: { id: "register-btn" },
                      on: {
                        click: function($event) {
                          return _vm.register()
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "btn-normal-div" }, [
                        _vm._v("Create Account")
                      ]),
                      _vm._v(" "),
                      _vm._m(5)
                    ]
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "p",
                {
                  staticClass:
                    "login__modal__footer has-text-grey column is-8 is-offset-2"
                },
                [
                  _c(
                    "a",
                    {
                      on: {
                        click: function($event) {
                          return _vm.loginModalChangeTab("l")
                        }
                      }
                    },
                    [_vm._v("Already have an account?")]
                  ),
                  _vm._v("  · \n\t\t\t\t\t"),
                  _c("a", { attrs: { href: "../" } }, [_vm._v("Need Help?")])
                ]
              )
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _c("button", {
        staticClass: "modal-close is-large",
        attrs: { "aria-label": "close" },
        on: {
          click: function($event) {
            return _vm.hideLoginModal()
          }
        }
      }),
      _vm._v(" "),
      _c("form", {
        staticStyle: { display: "none" },
        attrs: { id: "frm-logout", action: "/auth/logout", method: "POST" }
      })
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("figure", { staticClass: "avatar" }, [
      _c("img", {
        attrs: {
          src: "/img/dnd_companion_logo.svg",
          onerror: "this.onerror=null; this.src='/img/dnd_companion_logo.png'"
        }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "field" }, [
      _c("label", { staticClass: "checkbox" }, [
        _c("input", { attrs: { id: "login-remember", type: "checkbox" } }),
        _vm._v("\n\t\t\t\t\t\t\t\tRemember me\n\t\t\t\t\t\t\t")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "btn-busy-div spinner" }, [
      _c("div", { staticClass: "bounce1" }),
      _vm._v(" "),
      _c("div", { staticClass: "bounce2" }),
      _vm._v(" "),
      _c("div", { staticClass: "bounce3" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("figure", { staticClass: "avatar" }, [
      _c("img", {
        attrs: {
          src: "/img/dnd_companion_logo.svg",
          onerror: "this.onerror=null; this.src='/img/dnd_companion_logo.png'"
        }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "field" }, [
      _c("label", { staticClass: "checkbox" }, [
        _c("input", { attrs: { id: "register-remember", type: "checkbox" } }),
        _vm._v("\n\t\t\t\t\t\t\t\tRemember me\n\t\t\t\t\t\t\t")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "btn-busy-div spinner" }, [
      _c("div", { staticClass: "bounce1" }),
      _vm._v(" "),
      _c("div", { staticClass: "bounce2" }),
      _vm._v(" "),
      _c("div", { staticClass: "bounce3" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/My_Npcs.vue?vue&type=template&id=fecec65a&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/My_Npcs.vue?vue&type=template&id=fecec65a& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "npcs-mine" },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.editing,
              expression: "!editing"
            }
          ],
          staticClass: "columns"
        },
        [
          _c(
            "div",
            { staticClass: "column is-three-quarters" },
            [_c("npc-view", { attrs: { npc: _vm.curr_npc } })],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "column" }, [
            _c(
              "button",
              {
                staticClass: "button is-danger is-fullwidth",
                on: {
                  click: function($event) {
                    _vm.editing = true
                  }
                }
              },
              [_vm._m(0), _vm._v("Edit\n\t\t\t")]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "npc-list" },
              _vm._l(_vm.my_npcs, function(npc) {
                return _c(
                  "div",
                  {
                    key: npc.id,
                    staticClass: "button",
                    on: {
                      click: function($event) {
                        return _vm.showNPC(npc)
                      }
                    }
                  },
                  [_vm._v("\n\t\t\t\t\t" + _vm._s(npc.summary) + "\n\t\t\t\t")]
                )
              }),
              0
            )
          ])
        ]
      ),
      _vm._v(" "),
      _vm.editing
        ? _c("npc-edit", {
            ref: "edit",
            attrs: { npc: _vm.curr_npc },
            on: {
              saveChanges: function($event) {
                return _vm.saveChanges($event)
              },
              stopEditing: function($event) {
                _vm.editing = false
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-edit" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=template&id=528a913a&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=template&id=528a913a& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.npc
    ? _c(
        "div",
        { staticClass: "npc-public-fullview" },
        [_c("npc-view", { attrs: { npc: _vm.npc } })],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_edit.vue?vue&type=template&id=8e93e46c&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_edit.vue?vue&type=template&id=8e93e46c& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "npc-editing columns" }, [
    _c("div", { staticClass: "column is-three-quarters" }, [
      _vm.npc
        ? _c("div", { staticClass: "npc-edit" }, [
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "name" } }, [
                _vm._v("Name")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.name,
                        expression: "new_npc.name"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "name",
                      type: "text",
                      placeholder: _vm.npc.name
                    },
                    domProps: { value: _vm.new_npc.name },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "name", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.name = _vm.getName(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "race" } }, [
                _vm._v("Race")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.race,
                        expression: "new_npc.race"
                      }
                    ],
                    staticClass: "input select-overlay",
                    attrs: {
                      id: "race",
                      type: "text",
                      placeholder: _vm.npc.race
                    },
                    domProps: { value: _vm.new_npc.race },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "race", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "select is-fullwidth is-overlaid" },
                    [
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.new_npc.race,
                              expression: "new_npc.race"
                            }
                          ],
                          staticClass: "is-expanded",
                          on: {
                            change: [
                              function($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function(o) {
                                    return o.selected
                                  })
                                  .map(function(o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.new_npc,
                                  "race",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                              function($event) {
                                return _vm.onRaceChange(_vm.new_npc.race)
                              }
                            ]
                          }
                        },
                        [
                          _vm._l(_vm.RACES, function(r) {
                            return _c(
                              "option",
                              { key: r.index, domProps: { value: r.name } },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t\t\t" +
                                    _vm._s(
                                      r.subrace_index !== null
                                        ? "    " + r.name
                                        : r.name
                                    ) +
                                    "\n\t\t\t\t\t\t\t\t\t"
                                )
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t\t\t\tOther\n\t\t\t\t\t\t\t\t\t"
                            )
                          ])
                        ],
                        2
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          return _vm.setupRace(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "sex" } }, [
                _vm._v("Sex")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.sex,
                        expression: "new_npc.sex"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "sex",
                      type: "text",
                      placeholder: _vm.npc.sex
                    },
                    domProps: { value: _vm.new_npc.sex },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "sex", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.sex = _vm.getSex(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "age" } }, [
                _vm._v("Age")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.age,
                        expression: "new_npc.age"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "age",
                      type: "text",
                      placeholder: _vm.npc.age
                    },
                    domProps: { value: _vm.new_npc.age },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "age", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          return _vm.getAge(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "appearance" } },
                [_vm._v("Appearance")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.appearance,
                        expression: "new_npc.appearance"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "appearance",
                      type: "text",
                      placeholder: _vm.npc.appearance
                    },
                    domProps: { value: _vm.new_npc.appearance },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "appearance", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.appearance = _vm.getAppearance(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "voice" } }, [
                _vm._v("Voice")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.voice,
                        expression: "new_npc.voice"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "voice",
                      type: "text",
                      placeholder: _vm.npc.voice
                    },
                    domProps: { value: _vm.new_npc.voice },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "voice", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.voice = _vm.getVoice(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "personality" } },
                [_vm._v("Personality")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.personality,
                        expression: "new_npc.personality"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "personality",
                      type: "text",
                      placeholder: _vm.npc.personality
                    },
                    domProps: { value: _vm.new_npc.personality },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.new_npc,
                          "personality",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.personality = _vm.getPersonalityFull(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "trait" } }, [
                _vm._v("Trait")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.trait,
                        expression: "new_npc.trait"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "trait",
                      type: "text",
                      placeholder: _vm.npc.trait
                    },
                    domProps: { value: _vm.new_npc.trait },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "trait", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.trait = _vm.getTrait(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "bond" } }, [
                _vm._v("Bond")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.bond,
                        expression: "new_npc.bond"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "bond",
                      type: "text",
                      placeholder: _vm.npc.bond
                    },
                    domProps: { value: _vm.new_npc.bond },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "bond", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.bond = _vm.getBond(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "motivation" } },
                [_vm._v("Motivation")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.motivation,
                        expression: "new_npc.motivation"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "motivation",
                      type: "text",
                      placeholder: _vm.npc.motivation
                    },
                    domProps: { value: _vm.new_npc.motivation },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "motivation", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.motivation = _vm.getMotivation(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "ideal" } }, [
                _vm._v("Ideal")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.ideal,
                        expression: "new_npc.ideal"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "ideal",
                      type: "text",
                      placeholder: _vm.npc.ideal
                    },
                    domProps: { value: _vm.new_npc.ideal },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "ideal", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.ideal = _vm.getIdeal(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "flaw" } }, [
                _vm._v("Flaw")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.flaw,
                        expression: "new_npc.flaw"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "flaw",
                      type: "text",
                      placeholder: _vm.npc.flaw
                    },
                    domProps: { value: _vm.new_npc.flaw },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "flaw", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.flaw = _vm.getFlaw(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "quirk" } }, [
                _vm._v("Quirk")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.quirk,
                        expression: "new_npc.quirk"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "quirk",
                      type: "text",
                      placeholder: _vm.npc.quirk
                    },
                    domProps: { value: _vm.new_npc.quirk },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "quirk", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.quirk = _vm.getQuirk(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "detail" } }, [
                _vm._v("Detail")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.detail,
                        expression: "new_npc.detail"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "detail",
                      type: "text",
                      placeholder: _vm.npc.detail
                    },
                    domProps: { value: _vm.new_npc.detail },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "detail", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.detail = _vm.getDetail(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "class" } }, [
                _vm._v("Class")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.class,
                        expression: "new_npc.class"
                      }
                    ],
                    staticClass: "input select-overlay",
                    attrs: {
                      id: "class",
                      type: "text",
                      placeholder: _vm.npc.class
                    },
                    domProps: { value: _vm.new_npc.class },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "class", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "select is-fullwidth is-overlaid" },
                    [
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.new_npc.class,
                              expression: "new_npc.class"
                            }
                          ],
                          staticClass: "is-expanded",
                          on: {
                            change: function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.$set(
                                _vm.new_npc,
                                "class",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            }
                          }
                        },
                        [
                          _vm._l(_vm.CLASSES, function(c) {
                            return _c("option", { key: c.index }, [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\t\t" +
                                  _vm._s(c) +
                                  "\n\t\t\t\t\t\t\t\t\t"
                              )
                            ])
                          }),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t\t\t\tOther\n\t\t\t\t\t\t\t\t\t"
                            )
                          ])
                        ],
                        2
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          return _vm.getClass(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "profession" } },
                [_vm._v("Profession")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.profession,
                        expression: "new_npc.profession"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "profession",
                      type: "text",
                      placeholder: _vm.npc.profession
                    },
                    domProps: { value: _vm.new_npc.profession },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "profession", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.profession = _vm.getProfession(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "religion" } },
                [_vm._v("Religion")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.worship_habit,
                        expression: "new_npc.worship_habit"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "religion",
                      type: "text",
                      placeholder: _vm.npc.worship_habit
                    },
                    domProps: { value: _vm.new_npc.worship_habit },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.new_npc,
                          "worship_habit",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.worship_habit = _vm.getWorshipHabit(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "relationship" } },
                [_vm._v("Relationship Status")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.relationship,
                        expression: "new_npc.relationship"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "relationship",
                      type: "text",
                      placeholder: _vm.npc.relationship
                    },
                    domProps: { value: _vm.new_npc.relationship },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.new_npc,
                          "relationship",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.relationship = _vm.getRelationship(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "life_event" } },
                [_vm._v("Life Event")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.life_event,
                        expression: "new_npc.life_event"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "life_event",
                      type: "text",
                      placeholder: _vm.npc.life_event
                    },
                    domProps: { value: _vm.new_npc.life_event },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "life_event", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.life_event = _vm.getLifeEvent(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "speed" } }, [
                _vm._v("Speed")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.speed,
                        expression: "new_npc.speed"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "speed",
                      type: "text",
                      placeholder: _vm.npc.speed
                    },
                    domProps: { value: _vm.new_npc.speed },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "speed", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.speed = _vm.getSpeedFromRace(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-undo" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "speed_fly" } },
                [_vm._v("Fly Speed")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.speed_fly,
                        expression: "new_npc.speed_fly"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "speed_fly",
                      type: "text",
                      placeholder: _vm.npc.speed_fly
                    },
                    domProps: { value: _vm.new_npc.speed_fly },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "speed_fly", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.speed_fly = _vm.getSpeedFlyFromRace(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-undo" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "speed_swim" } },
                [_vm._v("Swim Speed")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.speed_swim,
                        expression: "new_npc.speed_swim"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "speed_swim",
                      type: "text",
                      placeholder: _vm.npc.speed_swim
                    },
                    domProps: { value: _vm.new_npc.speed_swim },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "speed_swim", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.speed_swim = _vm.getSpeedSwimFromRace(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-undo" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label" }, [_vm._v("Ability Scores")]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          return _vm.getASIs(_vm.new_npc, "roll")
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fas fa-dice" }),
                      _vm._v(" 4D6 Drop Lowest\n\t\t\t\t\t\t\t")
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          return _vm.getASIs(_vm.new_npc, "array")
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fas fa-random" }),
                      _vm._v(" Standard Array\n\t\t\t\t\t\t\t")
                    ]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "asi_str" } }, [
                _vm._v("Strength")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.asi[0],
                        expression: "new_npc.asi[0]"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "asi_str",
                      type: "text",
                      placeholder: _vm.npc.asi[0]
                    },
                    domProps: { value: _vm.new_npc.asi[0] },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc.asi, 0, $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.$set(
                            _vm.new_npc.asi,
                            0,
                            _vm.getASI(_vm.new_npc, 0)
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "asi_dex" } }, [
                _vm._v("Dexterity")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.asi[1],
                        expression: "new_npc.asi[1]"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "asi_dex",
                      type: "text",
                      placeholder: _vm.npc.asi[1]
                    },
                    domProps: { value: _vm.new_npc.asi[1] },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc.asi, 1, $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.$set(
                            _vm.new_npc.asi,
                            1,
                            _vm.getASI(_vm.new_npc, 1)
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "asi_con" } }, [
                _vm._v("Constitution")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.asi[2],
                        expression: "new_npc.asi[2]"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "asi_con",
                      type: "text",
                      placeholder: _vm.npc.asi[2]
                    },
                    domProps: { value: _vm.new_npc.asi[2] },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc.asi, 2, $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.$set(
                            _vm.new_npc.asi,
                            2,
                            _vm.getASI(_vm.new_npc, 2)
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "asi_int" } }, [
                _vm._v("Intelligence")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.asi[3],
                        expression: "new_npc.asi[3]"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "asi_int",
                      type: "text",
                      placeholder: _vm.npc.asi[3]
                    },
                    domProps: { value: _vm.new_npc.asi[3] },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc.asi, 3, $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.$set(
                            _vm.new_npc.asi,
                            3,
                            _vm.getASI(_vm.new_npc, 3)
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "asi_wis" } }, [
                _vm._v("Wisdom")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.asi[4],
                        expression: "new_npc.asi[4]"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "asi_wis",
                      type: "text",
                      placeholder: _vm.npc.asi[4]
                    },
                    domProps: { value: _vm.new_npc.asi[4] },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc.asi, 4, $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.$set(
                            _vm.new_npc.asi,
                            4,
                            _vm.getASI(_vm.new_npc, 4)
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "asi_cha" } }, [
                _vm._v("Charisma")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.asi[5],
                        expression: "new_npc.asi[5]"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "asi_cha",
                      type: "text",
                      placeholder: _vm.npc.asi[5]
                    },
                    domProps: { value: _vm.new_npc.asi[5] },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc.asi, 5, $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.$set(
                            _vm.new_npc.asi,
                            5,
                            _vm.getASI(_vm.new_npc, 5)
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "languages" } },
                [_vm._v("Languages")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.languages,
                        expression: "new_npc.languages"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "languages",
                      type: "text",
                      placeholder: _vm.npc.languages
                    },
                    domProps: { value: _vm.new_npc.languages },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "languages", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.languages = _vm.getLanguagesFromRace(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "racials" } }, [
                _vm._v("Racial Extras")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.racials,
                        expression: "new_npc.racials"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "racials",
                      type: "text",
                      placeholder: _vm.npc.racials
                    },
                    domProps: { value: _vm.new_npc.racials },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "racials", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.racials = _vm.getRacialsFromRace(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-undo" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "hook" } }, [
                _vm._v("Plot Hook")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.hook,
                        expression: "new_npc.hook"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "hook",
                      type: "text",
                      placeholder: _vm.npc.hook
                    },
                    domProps: { value: _vm.new_npc.hook },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "hook", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.hook = _vm.getHook(_vm.new_npc)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                { staticClass: "label", attrs: { for: "attacks_abilities" } },
                [_vm._v("Attacks/Abilities")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.attacks_abilities,
                        expression: "new_npc.attacks_abilities"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "attacks_abilities",
                      type: "text",
                      placeholder: _vm.npc.attacks_abilities
                    },
                    domProps: { value: _vm.new_npc.attacks_abilities },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.new_npc,
                          "attacks_abilities",
                          $event.target.value
                        )
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "skills" } }, [
                _vm._v("Skills")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.skills,
                        expression: "new_npc.skills"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "skills",
                      type: "text",
                      placeholder: _vm.npc.skills
                    },
                    domProps: { value: _vm.new_npc.skills },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "skills", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.skills = _vm.getSkills()
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-dice" })]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "misc" } }, [
                _vm._v("Misc")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.misc,
                        expression: "new_npc.misc"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "misc",
                      type: "text",
                      placeholder: _vm.npc.misc
                    },
                    domProps: { value: _vm.new_npc.misc },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "misc", $event.target.value)
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "label", attrs: { for: "summary" } }, [
                _vm._v("Summary")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "field has-addons" }, [
                _c("div", { staticClass: "control is-expanded" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.new_npc.summary,
                        expression: "new_npc.summary"
                      }
                    ],
                    staticClass: "input",
                    attrs: {
                      id: "summary",
                      type: "text",
                      placeholder: _vm.npc.summary
                    },
                    domProps: { value: _vm.new_npc.summary },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.new_npc, "summary", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-success",
                      on: {
                        click: function($event) {
                          _vm.new_npc.summary = _vm.getDefaultSummary(
                            _vm.new_npc
                          )
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-undo" })]
                  )
                ])
              ])
            ])
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "column" }, [
      _c(
        "button",
        {
          staticClass: "button is-success is-fullwidth",
          on: {
            click: function($event) {
              return _vm.saveChanges()
            }
          }
        },
        [_vm._m(0), _vm._v("Apply Changes\n\t\t\t")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "button is-info is-fullwidth",
          on: {
            click: function($event) {
              return _vm.randomize()
            }
          }
        },
        [_vm._m(1), _vm._v("Randomize All\n\t\t\t")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "button is-warning is-fullwidth",
          on: {
            click: function($event) {
              return _vm.revertChanges()
            }
          }
        },
        [_vm._m(2), _vm._v("Revert Changes\n\t\t\t")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "button is-light is-fullwidth",
          on: {
            click: function($event) {
              return _vm.stopEditing()
            }
          }
        },
        [_vm._m(3), _vm._v("Cancel Editing\n\t\t\t")]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-check" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-dice" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-undo" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-ban" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_generator.vue?vue&type=template&id=0cdac2c3&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_generator.vue?vue&type=template&id=0cdac2c3& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "npc-generator" },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.editing,
              expression: "!editing"
            }
          ],
          staticClass: "columns"
        },
        [
          _c(
            "div",
            { staticClass: "column is-three-quarters" },
            [_c("npc-view", { attrs: { npc: _vm.npc } })],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "column" }, [
            _c(
              "button",
              {
                staticClass: "button is-info is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.randomize()
                  }
                }
              },
              [_vm._m(0), _vm._v("Randomize\n\t\t\t")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "button is-danger is-fullwidth",
                on: {
                  click: function($event) {
                    _vm.editing = true
                  }
                }
              },
              [_vm._m(1), _vm._v("Edit\n\t\t\t")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "button is-success is-fullwidth",
                on: {
                  click: function($event) {
                    return _vm.saveNPCToMine()
                  }
                }
              },
              [_vm._m(2), _vm._v("Save to My NPCs\n\t\t\t")]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _vm.editing
        ? _c("npc-edit", {
            ref: "edit",
            attrs: { npc: _vm.npc },
            on: {
              saveChanges: function($event) {
                return _vm.saveChanges($event)
              },
              stopEditing: function($event) {
                _vm.editing = false
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-dice" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-edit" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-save" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_view.vue?vue&type=template&id=beffd636&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npc_view.vue?vue&type=template&id=beffd636& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.npc
    ? _c("div", { staticClass: "npc-output" }, [
        _c("div", [
          _c("span", [_vm._v("Name:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.name))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Race:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.race))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Sex:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.sex))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Age:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.age))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Appearance:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.appearance))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Voice:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.voice))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Personality:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.personality))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Trait:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.trait))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Bond:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.bond))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Motivation:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.motivation))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Ideal:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.ideal))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Flaw:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.flaw))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Quirk:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.quirk))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Detail:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.detail))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Class:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.class))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Profession:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.profession))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Religion:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.worship_habit))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Relationship Status:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.relationship))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Life Event:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.life_event))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Speed:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.speed))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Fly Speed:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.speed_fly))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Swim Speed:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.speed_swim))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Str:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.asi[0]))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Dex:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.asi[1]))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Con:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.asi[2]))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Int:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.asi[3]))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Wis:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.asi[4]))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Cha:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.asi[5]))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Languages:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.languages))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Racial Extras:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.racials))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Plot Hook:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.hook))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Attacks/Abilities:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.attacks_abilities))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Skills:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.skills))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Misc:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.misc))])
        ]),
        _vm._v(" "),
        _c("div", [
          _c("span", [_vm._v("Summary:")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.npc.summary))])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npcs.vue?vue&type=template&id=463c4258&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Npcs.vue?vue&type=template&id=463c4258& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "tabs is-boxed is-large", attrs: { id: "npc-tabs" } },
      [
        _c("ul", [
          _c("li", { class: { "is-active": _vm.activeTab === "gen" } }, [
            _c(
              "a",
              {
                on: {
                  click: function($event) {
                    return _vm.changeTab("gen")
                  }
                }
              },
              [_vm._v("NPC Generator")]
            )
          ]),
          _vm._v(" "),
          _c("li", { class: { "is-active": _vm.activeTab === "mine" } }, [
            _c(
              "a",
              {
                on: {
                  click: function($event) {
                    return _vm.changeTab("mine")
                  }
                }
              },
              [_vm._v("My NPCs")]
            )
          ]),
          _vm._v(" "),
          _c("li", { class: { "is-active": _vm.activeTab === "public" } }, [
            _c(
              "a",
              {
                on: {
                  click: function($event) {
                    return _vm.changeTab("public")
                  }
                }
              },
              [_vm._v("Public NPCs")]
            )
          ])
        ])
      ]
    ),
    _vm._v(" "),
    _c("div", { attrs: { id: "npc-tab-content" } }, [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.activeTab === "gen",
              expression: "activeTab==='gen'"
            }
          ]
        },
        [
          _c("npc-generator", {
            ref: "tab_gen",
            attrs: { data: _vm.data },
            on: {
              onSaveNPCToMine: function($event) {
                return _vm.saveNPCToMine()
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.activeTab === "mine",
              expression: "activeTab==='mine'"
            }
          ]
        },
        [
          _vm.LOGGED_IN
            ? _c("my-npcs", { ref: "tab_mine", attrs: { data: _vm.data } })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.activeTab === "public",
              expression: "activeTab==='public'"
            }
          ]
        },
        [_c("public-npcs")],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Public_Npcs.vue?vue&type=template&id=4848f1b6&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/npcs/Public_Npcs.vue?vue&type=template&id=4848f1b6& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "npcs-public" }, [
      _c("div", [_vm._v("\n\t\tCOMING SOON\n\t")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
Vue.config.productionTip = false;
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/***/ }),

/***/ "./resources/js/components/auth/Auth.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/auth/Auth.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_vue_vue_type_template_id_29320894___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.vue?vue&type=template&id=29320894& */ "./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&");
/* harmony import */ var _Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_vue_vue_type_template_id_29320894___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_vue_vue_type_template_id_29320894___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/auth/Auth.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Auth.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_template_id_29320894___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Auth.vue?vue&type=template&id=29320894& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_template_id_29320894___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_template_id_29320894___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/eventbus/EventBus.js":
/*!******************************************************!*\
  !*** ./resources/js/components/eventbus/EventBus.js ***!
  \******************************************************/
/*! exports provided: EventBus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBus", function() { return EventBus; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();

/***/ }),

/***/ "./resources/js/components/json/npc/npc_appearances.json":
/*!***************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_appearances.json ***!
  \***************************************************************/
/*! exports provided: appearances, default */
/***/ (function(module) {

module.exports = {"appearances":{"body-general":["tall","average height","short","petite","tiny","compact","big","large","burly","beefy","bulky","brawny","barrel-chested","heavy-set","fat","overweight","obese","flabby","chunky","chubby","pudgy","pot-bellied","portly","thick","stout","lush","plush","full-figured","ample","rounded","generous","voluptuous","curvy","hourglass","plump","long-legged","gangling","lanky","coltish","lissome","willowy","lithe","lean","slim","slender","trim","thin","skinny","emaciated","gaunt","bony","spare","solid","stocky","wiry","rangy","sinewy","stringy","ropy","sturdy","strapping","powerful","hulking","fit","athletic","toned","built","muscular","chiseled","taut","ripped","Herculean","broad-shouldered","sloping shoulders","bowlegged"],"skin-color":["amber","bronze","cinnamon","copper","dark brown","deep brown","ebony","honey","golden","pale","pallid","pasty","fair","light","creamy","alabaster","ivory","bisque","milky","porcelain","chalky","sallow","olive","peach","rosy","ruddy","russet","tawny","fawn"],"skin-type":["wrinkled","seamed","leathery","sagging","drooping","loose","clear","smooth","silken","satiny","dry","flaky","scaly","delicate","thin","translucent","luminescent","baby-soft","flawless","poreless","porous","glowing","dewy","dull","velvety","fuzzy","rough","uneven","mottled","dimpled","doughy","firm","freckled","pimply","pockmarked","blemished","pitted","scarred","bruised","veined","scratched","sunburned","weather-beaten","raw","tattooed"],"eyes-general":["large","small","narrow","sharp","squinty","round","wide-set","close-set","deep-set","sunken","bulging","protruding","wide","hooded","heavy-lidded","bright","sparkling","glittering","flecked","dull","bleary","rheumy","cloudy","red-rimmed","beady","birdlike","cat-like","jewel-like","steely","hard","fringed with long lashes","with sweeping eyelashes","with thick eyelashes"],"eyes-color":["chestnut","chocolate brown","cocoa brown","coffee brown","mocha","mahogany","sepia","sienna brown","mink brown","copper","amber","cognac","whiskey","brandy","honey","tawny","topaz","hazel","obsidian","onyx","coal","raven","midnight","sky blue","sunny blue","cornflower blue","steel blue","ice blue","arctic blue","glacial blue","crystal blue","cerulean blue","electric blue","azure","lake blue","aquamarine","turquoise","denim blue","slate blue","slate gray","storm blue","storm gray","silver","chrome","platinum","pewter","smoky gray","ash gray","concrete gray","dove gray","shark gray","fog gray","gunmetal gray","olive green","emerald","leaf green","moss green"],"eyebrows":["arched","straight","plucked","sparse","trim","dark","faint","thin","thick","unruly","bushy","heavy"],"face-general":["square","round","oblong","oval","elongated","narrow","heart-shaped","catlike","wolfish","high foreheaded","broad foreheaded","prominent brow ridged","protruding brow boned","sharp cheekboned","high cheekboned","angular cheekboned","hollow cheeked","square jawed","chiseled","sculpted","craggy","soft","jowly","jutting chinned","pointed chinned","weak chinned","receding chinned","double chinned","cleft chinned","dimpled"],"nose":["snub","dainty","button","turned-up","long","broad","thin","straight","pointed","crooked","bulbous","flared","hawk","strong"],"mouth":["thin lips","narrow lips","full lips","lush lips","dry lips","cracked lips","chapped lips","moist lips","glossy lips","straight teeth","gap between teeth","gleaming white teeth","an overbite","an underbite"],"facial-hair":["is clean-shaven","is smooth-shaven","a beard","a neckbeard","a goatee","a moustache","sideburns","mutton-chop sideburns","stubble","a few days growth of beard","a five o-clock shadow"],"hair-general":["long","short","shoulder-length","loose","limp","dull","shiny","glossy","sleek","smooth","luminous","lustrous","spiky","stringy","shaggy","tangled","messy","tousled","windblown","unkempt","bedhead","straggly","neatly combed","parted","slicked down","slicked back","cropped","clipped","buzzed","crewcut","bob","mullet","curly","bushy","frizzy","wavy","straight","lanky","dry","oily","greasy","layers","corkscrews","spirals","ringlets","braids","widow�s peak","bald","shaved","comb-over","afro","thick","luxuriant","voluminous","full","wild","untamed","bouncy","wispy","fine","thinning"],"hair-color":["black","blue-black","jet black","raven","ebony","inky black","midnight","sable","salt and pepper","silver","charcoal gray","steel gray","white","snow-white","brown","brunette","chocolate brown","coffee brown","ash brown","brown sugar","nut brown","caramel","tawny brown","toffee brown","red","ginger","auburn","copper","strawberry blonde","butterscotch","honey","wheat","blonde","golden","sandy blond","flaxen","fair-haired","bleached","platinum"],"hands":["delicate","small","large","square","sturdy","strong","smooth","rough","calloused","elegant","plump","manicured","stubby fingered","long fingered","ragged nailed","grimy fingernailed","ink-stained"],"misc":["Distinctive jewelry: earings, necklace, circlet, bracelets","Piercings","Flamboyant or outlandish clothes","Formal, clean clothes","Ragged, dirty clothes","Pronounced scar","Missing teeth","Missing finger(s)","Unusual eye color, or two different colors","Tattoos","Birthmark","Unusual skin color","Bald","Braided beard or hair","Unusual hair color","Nervous eye twitch","Lazy eye","Distinctive nose","Distinctive posture (crooked or rigid)","Exceptionally beautiful","Exceptionally ugly","Unusually short","Unusually tall","Missing an eye; Wears an eyepatch.","Large scar across their chin.","Tattoo of a mermaid on their arm.","Large, bushy sideburns.","Noticeably crooked teeth. They keep trying to hide their mouth while speaking.","Tons of freckles.","Single long braid in beard.","Twisted lips.","Always frowning.","Piercing blue eyes.","Frizzy hair.","An impressive handlebar moustache.","Dreadlocks.","Heavily perfumed (smells great).","Heavily perfumed (smells awful).","Noticeably thin and malnurished.","Albino.","Greying hair.","Curly hair.","Large bushy beard.","Missing right ear.","Weird skin disease.","Borderline obese.","Short, black hair.","Bad acne.","Lanky.","Long, elaborate earrings.","Large, hairy hands.","Blind.","Very muscular.","Abnormally large nose.","Pale Skin.","Battle scars.","Peg leg.","Poor eyesight; large glasses.","Balding.","Walk with a bad limp.","Slobbish/unkempt.","Rough/wayworn attire.","Gorgeous figure.","One arm.","Greasy hair.","Green hair.","Burn scars.","Long, braided hair.","Bright blonde hair.","Always smiling.","Deformed head.","Pointy ears.","Silky, white hair.","Horribly ugly. You don't want to look directly at them.","Has leprosy.","Very ill. (Maybe contagious?)","Hairy Arms.","Face tattoos.","One arm longer than the other.","Tiny mouth.","Completely hairless.","Green eyes.","Drooling.","Always has a confused look.","Fangs.","Gold Tooth.","Dark skin.","Hook hand.","Grey eyes.","Ginger hair.","Long, bony fingers.","Clean shaven.","Neck tattoos.","Covered in warts.","Thin moustache.","Athletic build.","Goatee beard.","Has a tail.","A long, glorious beard. Each braid represents another person that has asked him what the braids mean.","Has a cleft cut into their nose.","Has many tiny tattoos across their face starting from the corner of their mouth to the edge of their eye.","Has an extra hand coming out of their right arm the hand is as small as a child’s and is blackened and seems to be of no use.","Is missing a tooth.","One of their arms is a different tone, length, and has a different shape of hand than the other.","Has been cursed to have a part of their body, (arm, leg, hand, maybe even a tail...) that is of a different race. (ex. A human with the hand of a tabaxi...)","Has many scars and callouses along their forearms, perhaps being formed over many brutal sparring sessions.","Has long, slender fingers, perhaps from living an easy life in the high class or perhaps from living a life scrounging in the streets.","Has well-toned leg muscles. Clearly, they are used to running.","Has bags under their eyes, perpetually unable to sleep a full night.","Has meticulously groomed hair (beard and mustache as well, if applicable) and is almost never seen with an out-of-place hair.","Wears an array of gaudy and flamboyant jewellery, supporting itself on a cane embedded with a poorly cut ruby too big to be real. It's ears sport a multitude of filigree ear rings, as if to distract from it crooked and yellow teeth.","Their eyes change color with their mood.","Is abnormally tall/short for their race.","Their left hand has steel claws that appear to be artificially attached.","Has a very faint tattoo on their forehead that requires a DC 15 Investigation check to make out clearly. The tattoo is enchanted to cast suggestion on someone who successfully investigates the tattoo. The suggestion is \"Stop looking at my forehead.\"","Has a surprisingly large butt/hips.","Has no hair.","Has a mohawk.","Has a beard with beads in it.","Has half of their hair blonde, and has one blonde eye on the same side.","Is carrying a large sack. On the sack are the letters TBD.","Doesn't have eyebrows, but instead has tattooed eyebrows slightly too high, which gives a look of permanent surprise.","Is covered in tattoos of the cities they have been to. Each one best representing that city.","Has a mouth on their back that says mean stuff about them. This would usually sadden people but this just pushes them to complete their goals more.","Has a horn coming out of their forehead that they are very self conscious about. They constantly shave it off if they have time.","Has scales on his legs. (If they are a species that usually has scales then their legs are human.)","Has no natural teeth left. Luckily for him his enemies had some of theres. His jaw is full of random teeth that are surgically placed in. They may not be fabulous but they sure is scary!","Has a magical tattoo that can answer riddles.","Is missing his left eye. He constantly forgets which eye is actually gone.","Has acid burn scars on both of his hands.","Is fascinated by jewelry so much so that they are wearing so much jewelry that it weighs them down.","Has a scar around their neck.","Has orange eyes that glow when near heroic people.","Has white eyes that glow when near neutral good to lawful good holy symbols.","Has red eyes that glow when near blood.","Has green eyes that glow when near poison.","Is extremely muscular but lazy in actions.","Has bright yellow hair that glows in the dark.","Has the tail of a rat.","Is blinded in daylight but can see perfectly in the dark.","Was given a curse by a witch when he was a child and now has a finger on his right arm that points in the direction of the closest person that wants to kill him.","Has a extremely chapped lips.","Has a tattoo of a map leading to an X. Doesn't remember when it got there or why it's there.","Has a mechanical limb that they cannot fully control. It does the motion for whatever he is thinking even if it's socially wrong.","Has a horrid burn mark running down from their left elbow to their hand.","Is missing his/her left arm, and doesn't seem quite used to functioning without it.","Has a jewel implanted in the place of a lost eye.","Has a distracting mole.","Has one long fingernail, presumably left unfiled for strumming an instrument.","Has a violet bruise on the bone of their cheek.","Has acne scars pockmarked across their face.","Has a snaggletooth long enough to be a fang.","Has one leg severely deformed; they carry themselves around on double crutches.","Has a pair of thick spectacles that don't fit.","Has thick, greasy dreadlocks from years of improper washing.","Has one eye swollen over from a recent fight.","Their mouth is permanently crooked, giving them a cocky smirk even in serious moments.","Has not cut or groomed his/her hair since he/she was defeated by his/her rival 8 years ago.","Scars... everywhere.","Has a beard that is visibly fake.","Has an eye on the palm of his/her right hand that he/she tries to hide with a fingerless glove.","Has one blue eye and one brown.","Their face has splotches the color of red wine.","Has a sparse beard, like underarm hair.","Has bushy eyebrows that waggle when they talk.","Has no nose. He has one big hole where the nose was supposed to be.","Walks with a significant limp requiring a cane to help them walk.","Has a very muscular upper body, but their legs look very underdeveloped.","Has 6 fingers.","Is androgynous. Very difficult to glean gender.","Has a Hunchback and disfigured face with extra growths.","Has whats left of a hand still attached. It looks like it was crushed and was never amputated.","Has abnormally large forearms and/or calves.","Is wearing an obvious wig.","Their left eye has three pupils.","Has a long pointy nose that curls and wiggles according to their emotions.","A holy symbol is branded onto their right hand.","Their teeth are made out of various rare metals.","Exotic runes are carved on their forearm.","Their hands are stained multiple colors.","Has a forked tongue","Has piercings all over their body. Bars and rings cover them.","Is blind/deaf.","Has ashen skin and no hair.","Has sharpened teeth and loves to smile.","Is unusually hairy, having thick hair on almost all visible skin apart from around eyes and palms.","Always wears bright, vibrant clothing.","Constantly twitches. They can't stay still.","The skin on their left forearm is transparent.","There are small mushrooms on the back of their neck.","Has small woodland critters in their hair.","Uses overly-exagerated movements for everything.","Is slowly rotting away.","Has incredibly beautiful features. One of the most beautiful people you've ever seen!","Has a cauliflower nose","Has a cleft lip","Is cross eyed","Looks extremely average","Has a burn on their face","Has a large facial mole","Is humorously obese","Is squint-eyed","Is always sweaty","Has unkempt eye-brows","Always has a hat on, never the same one","Has a spastic eye, looks like they are winking"]}};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_blessings.json":
/*!*************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_blessings.json ***!
  \*************************************************************/
/*! exports provided: blessings, default */
/***/ (function(module) {

module.exports = {"blessings":["Lucky","Extra Strength","Extra Dexterity","Extra Constitution","Extra Intelligence","Extra Wisdom","Extra Charisma","Often aided by a deity","Understands all spoken languages","Understands all written languages","Can breath underwater","Can magically levitate","Has immunity to a type of damage (cold, fire, etc)","Can resurrect people at will (limitations?)","Can see in complete darkness, even magical","Truesight, up to X feet","Can always tell when someone is lying","Can do complex math instantly","Sees the future, up to X minutes/days/years","Can sense natural disasters before they happen","Can turn invisible at will"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_bonds.json":
/*!*********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_bonds.json ***!
  \*********************************************************/
/*! exports provided: bonds, default */
/***/ (function(module) {

module.exports = {"bonds":["I would die to recover an ancient artifact of my faith that was lost long ago.","I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.","I owe my life to the priest who took me in when my parents died.","Everything I do is for the common people.","I will do anything to protect the temple where I served.","I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.","I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.","I owe everything to my mentor--a horrible person who's probably rotting in jail somewhere.","Somewhere out there I have a child who doesn't know me. I'm making the world better for him or her.","I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me.","A powerful person killed someone I love. Some day soon, I'll have my revenge.","I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself.","I'm trying to pay off an old debt I owe to a generous benefactor.","My ill-gotten gains go to support my family.","Something important was taken from me, and I aim to steal it back.","I will become the greatest thief that ever lived.","I'm guilty of a terrible crime. I hope I can redeem myself for it.","Someone I loved died because of a mistake I made. That will never happen again.","My instrument is my most treasured possession, and it reminds me of someone I love.","Someone stole my precious instrument, and someday I'll get it back.","I want to be famous, whatever it takes.","I idolize a hero of the old tales and measure my deeds against that person's.","I will do anything to prove myself superior to me hated rival.","I would do anything for the other members of my old troupe.","I have a family, but I have no idea where they are. One day, I hope to see them again.","I worked the land, I love the land, and I will protect the land.","A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.","My tools are symbols of my past life, and I carry them so that I will never forget my roots.","I protect those who cannot protect themselves.","I wish my childhood sweetheart had come with me to pursue my destiny.","The workshop where I learned my trade is the most important place in the world to me.","I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.","I owe my guild a great debt for forging me into the person I am today.","I pursue wealth to secure someone's love.","One day I will return to my guild and prove that I am the greatest artisan of them all.","I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood.","Nothing is more important than the other members of my hermitage, order, or association.","I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.","I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.","I entered seclusion because I loved someone I could not have.","Should my discovery come to light, it could bring ruin to the world.","My isolation gave me great insight into a great evil that only I can destroy.","I will face any challenge to win the approval of my family.","My house's alliance with another noble family must be sustained at all costs.","Nothing is more important than the other members of my family.","I am in love with the heir of a family that my family despises.","My loyalty to my sovereign is unwavering.","The common folk must see me as a hero of the people.","My family, clan, or tribe is the most important thing in my life, even when they are far from me.","An injury to the unspoiled wilderness of my home is an injury to me.","I will bring terrible wrath down on the evildoers who destroyed my homeland.","I am the last of my tribe, and it is up to me to ensure their names enter legend.","I suffer awful visions of a coming disaster and will do anything to prevent it.","It is my duty to provide children to sustain my tribe.","It is my duty to protect my students.","I have an ancient text that holds terrible secrets that must not fall into the wrong hands.","I work to preserve a library, university, scriptorium, or monastery.","My life's work is a series of tomes related to a specific field of lore.","I've been searching my whole life for the answer to a certain question.","I sold my soul for knowledge. I hope to do great deeds and win it back.","I'm loyal to my captain first, everything else second.","The ship is most important--crewmates and captains come and go.","I'll always remember my first ship.","In a harbor town, I have a paramour whose eyes nearly stole me from the sea.","I was cheated of my fair share of the profits, and I want to get my due.","Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine.","I would lay down my life for the people I served with.","Someone saved my life on the battlefield. To this day, I will never leave a friend behind.","My honor is my life.","I'll never forget the crushing defeat my company suffered or the enemies who dealt it.","Those who fight beside me are those worth dying for.","I fight for those who cannot fight for themselves.","My town or city is my home, and I'll fight to defend it.","I sponsor an orphanage to keep others from enduring what I was forced to endure.","I owe my survival to another urchin who taught me to live on the streets.","I owe a debt I can never repay to the person who took pity on me.","I escaped my life of poverty by robbing an important person, and I'm wanted for it.","No one else is going to have to endure the hardships I've been through."]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_city_points_of_interest.json":
/*!***************************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_city_points_of_interest.json ***!
  \***************************************************************************/
/*! exports provided: city-points-of-interest, default */
/***/ (function(module) {

module.exports = {"city-points-of-interest":["Capitol Building","Museum","Park","Lake/Pond","Guild Hall","Theater","Church/Shrine/Temple","Outdoor Marketplace","Library","Battle/Sporting Arena","Embassy","School","Barracks","Courthouse","Cemetary","Historical Monument","Mine Shaft","Stocks/Gallows","Private Mansion"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_curses.json":
/*!**********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_curses.json ***!
  \**********************************************************/
/*! exports provided: curses, default */
/***/ (function(module) {

module.exports = {"curses":["Lycanthrope (wolf, bat, bear, etc)","Sees Ghosts","Sees other realites/planes","Sees a false future","Madness","Unlucky","Hears voices","Life is tied to another entity (when other entity dies, so do they)","All food eaten by the character is tasteless and provides no pleasure.","Incredibly clumsy","Must always argue against what others say, even if they would tend to agree.","Forced obnoxious arrogance","Stutters","Must always lie","Falls asleep at random","Blind","Deaf","Mute","Donkey Ears","Arthritic hands","Relentless hair growth","Boils, warts, and sores","Bald, no hair growth","Eye-watering body odor","Missing all their teeth","Has to yell everytime they want to speak","A second head grows from their neck","Insanity","A random part of their body is petrified","Chaotic invisibility","Random short term memory loss","Hypnotized, bark like a dog (etc) when they hear a trigger word","Irrational addiction to a standard food/drink","Immune to all forms of magic (including healing)","Speaks in tongues when they see a symbol of their god","Speaks out loud their every thought","Laughs uncontrollably during inappropriate moments","The cursed must get proper permission before entering any domicile.","The cursed will always close their eyes in the presence of fire.","Anytime the cursed walks through a doorway, they will thoughtlessly slam it behind themselves, causing a racket and possibly knocking nearby items off shelves.","If the cursed sees a knot, they are compelled to untie it.","The cursed cannot get wet. If they do, their most important concern becomes drying themselves as soon as possible.","The cursed is mesmerized by any form of performance art they encounter. They are unable to continue on until it ends, or they are dragged away from it.","The cursed may never sit for any reason.","Nobody remembers the cursed between meetings. Each time they encounter someone, that person believes it is the very first time.","Everyone who meets the cursed seems to recall hearing stories about them. These stories paint the picture of an unreliable, cruel, and evil person.","Any money that the cursed doesn’t spend the same day the get it, disappears.","Compasses don’t work within 100′ of the cursed.","The cursed can be turned by clerics as though they were undead. If a friendly cleric turns undead, they are not able to exempt the cursed.","Every coin that passes through the hand of the cursed transforms into a less valuable metal. (Platinum turns to gold, gold to silver, silver to copper, copper to steel, etc).","A permanent raincloud drizzles on the head of the cursed. Each week they must roll a save versus Breath to avoid rusted equipment. (In addition to other annoyances which would occur).","The cursed’s shoes wear out within 4 hours. They must carry spare pairs unless they wish to adventure barefooted. Adventuring without shoes reduces max hp by 1 per hit die.","The cursed sleeps for 16 hours each day, instead of 8.","The cursed’s reflection shows a gaunt, dead thing. Not even a living corpse, just a corpse propped up in roughly the same position the cursed is currently in. Others who notice this will be horrified.","There will never be any lodging available in any town the cursed visits.","The gender of the cursed is randomly determined each morning.","The cursed gains a crippling weakness against common dogs. A dog’s bite is so poison to them, that they must make a save versus poison or die.","Anytime the cursed takes more than 3 damage in a single round the wind is knocked out of them. They must save versus Poison or they won’t be able to do any more than move during their next turn.","The cursed cannot hold their breath. Ever. At all. For any reason.","Any time a save is called for, the cursed rolls their worst save instead of the save that was intended.","Anytime the cursed is in a private residence, they will accidentally break something the owner holds dear.","Any time anyone at the game table coughs or sneezes, the cursed is consumed by a loud and obnoxious coughing / sneezing fit in-game. To the point that people start to think they’re faking it for attention or something.","The cursed’s dietary needs are altered so they can only be sustained by animals that people care about: horses, cats, dogs, etc. Nobody needs to care about the specific animal eaten, so long it is of a type that people in the area generally keep as pets.","Anything experienced by the cursed while alone is entirely fictional. The only real experiences they have are those shared by at least one other member of the party.","The cursed loses all concept of table manners. They eat in the most disgusting way imaginable.","The cursed character becomes hyper-sensitive to changes in air pressure. They cannot travel more than 20′ vertically in a day without becoming light headed and weak.","All clothing becomes unbearably itchy. The cursed must go about naked or suffer from constant discomfort.","The cursed attracts biting insects and rashes to their body; and thus they itch constantly. They are completely incapable of sitting still, and anytime it might be required they fidget and scratch and rub themselves against things. Contorting themselves to reach difficult itches.","Everything the cursed says comes out as sarcastic and disrespectful.","The cursed has intermittent super strength, allowing them to punch through stone walls and stomp their foes into the ground. This power only manifests itself when the cursed least desires it. This causes simple, ordinary actions to become destructive. The referee will judge which actions have this ‘benenfit’ after the fact.","Everything that the cursed says must rhyme. If they fail, they’ll take 1 point of damage each time.","The cursed cannot abide the presence of the opposite gender, and must either fight, or excuse themselves from the area if they encounter one.","Each non-cursed member of the group (including the referee) should be asked to name a common word. These words are then put onto a list, kept in common view of the whole table. If the cursed speaks any of these words during play, their character takes 1 point of damage to a random ability score.","The player to the right of the cursed should name a letter. The cursed cannot use any words which begin with that letter, on pain of suffering 1 point of damage each time they do so.","If the cursed uses an edged weapon, they will cut themselves after every fail attack roll, dealing half weapon damage.","The cursed grows a pair of gills, and can now only breathe in water.","The cursed must make an original pun each game day. Any days in which they fail to do this, they are struck by lightning.","The cursed must reroll all their ability scores each morning. 3d6, in order.","If the cursed is a caster, they may now only access the spells of a different casting class. Magic Users can only prepare Cleric spells. Clerics can only prepare MU spells. Other casters are restricted to the spells of whatever spellcasting class is deemed most opposed to their own. If the cursed is not a caster, reroll their curse.","Between sessions, the cursed goes on uncontrollable drunken adventures that they then have no memory of. Each session starts with a hangover, and a new injury.","The cursed becomes trapped in whatever clothes they’re currently wearing. Characters wearing armor will suffer mounting penalties after being forced to sleep in their armor for long periods. If the cursed was not wearing any armor at the time the curse took hold, they will still become ever smellier, and more offensive to civilized folk.","If music is played, the cursed must dance to it. Even if it’s just enemy wardrums.","The cursed’s face turns into a ceramic mask, fitted over exposed muscle and bone.","Any boat the cursed boards will be blown off course and shipwrecked far from where it was supposed to be.","The cursed is compelled to break any glass they see.","Pack animals hate the cursed, and will flee or attack if the cursed is near.","Instead of food, the cursed subsists off of making people cry.","Anyone who spends the night under the same roof as the cursed will be struck by lightning the next time they stand under an open sky.","An obese old woman appears each night to hover over the cursed as they sleep, staring at them in slack-jawed annoyance. Drool dribbles from her mouth, onto the cursed’s sleeping form. If she is confronted, she flies into a rage fit that will prevent anyone from sleeping. If she is attacked, she is killed, but the dreams of the cursed are tormented and give no rest. She returns the next night, still agitated from having been slain.","The cursed does not have a name. No word seems to describe them, and anytime one is tried, it is forgotten by everyone, including the cursed.","Everything the cursed says must be sung.","In any religious rite the cursed witnesses or participate in, they will perform a sacrilege.","Within a day of encountering some new community or culture, the cursed will always commit some highly offensive faux pas that is unique to that community.","Any tool the cursed uses has a 1 in 6 chance to break.","If the curseds own any structure, it will burn to the ground or be otherwise demolished the first time the cursed sleeps in it.","Any animal the cursed attempts to ride will attempt to buck them off at the most inopportune time possible.","No warning given by the cursed will ever be heeded.","No servant will remain faithful to the cursed when their back is turned.","No message sent from anything but the cursed’s own lips will ever reach its destination.","Any map the cursed might benefit from will be half-ruined before it can be used.","Half of any book the cursed might benefit from will be torn out or destroyed before they can be read.","Any wand found by the cursed will have only a single charge.","Anytime the cursed expresses a concern, it will be interpreted as a joke.","Any community the cursed stays in for a week will experience poor fortune for a year. Bad harvests, raiding bands, lost trade agreements, war, etc.","No fire can ever be put out in the presence of the cursed. Even fully submerging a torch in water won’t work.","The cursed has 100% fertility, and is irresistible to the opposite sex. 100% as in 'literally anything sexual results in pregnancy.' The cursed makes babies from blowjobs.","Anything that drops from the cursed’s hands is lost, and can only be found by someone who would never return it willingly.","Even the smallest amount of a drug–a thimble of beer, second hand marijuana smoke, etc–will have the full effects of a day of binging on the cursed.","The cursed’s morality becomes an absolutist thing. Any deviation from your alignment or stated values will result in losing all class abilities until an atonement is made.","The cursed tastes good. Really good. Creatures that eat manflesh will smell the cursed much more readily, and be persistent in pursuing them. Any time the cursed takes damage from fire, the sizzling scent causes an immediate random encounter check. Any time the cursed takes damage from a bite, that creature will direct all their attacks towards the tasty tasted cursed one.","The cursed comes to believe strongly that the Iron age was a mistake, and that mankind was led astray by their hubris in smelting metals that were not meant for them. Bronze is the most advanced metal the cursed may use. The cursed will proselytize to others about their iron-sins.","The cursed believes they are dead. Any damage dealt to them, as well as their actual hit point total, are kept secret by the referee. The cursed simply doesn’t believe any of it has occurred. How can they be hurt if they’re already dead? It’s silly.","The cursed PC transforms into the cursed player. The PC takes on the appearance of the player, as well as the group’s best guess at how the player’s real life abilities would translate into the game world. The new PC doesn’t have any modern knowledge. They are as they would be if they had been born in the game world and followed an equivalent life path to their real life’s path.","Randomly determine a player who is not the cursed or the referee. That player must come up with a catchphrase. Any session in which the cursed does not use their catchphrase in some appropriate way, is a session in which they forfeit any experience points they would have gained.","The cursed falls into a deep sleep until their true love’s kiss wakes them. The the cursed is unplayable, and will likely remain so unless the rest of the party set up a kissing booth or something.","The the cursed immediately and irrevocably falls in love with the next NPC of the appropriate type they meet. Resisting this infatuation will result in a negative level each week, as the cursed finds they cannot eat or sleep or enjoy the activities they once did. The only cure for this malady is the pursuit and marriage of the NPC. The cursed will always be very happy in this marriage and unwilling to leave it, no matter how horrible and demanding the referee makes their spouse. The referee is encouraged to make the cursed’s spouse very horrible and demanding.","The cursed shows visible, obvious signs of desire anytime they see a piece of treasure. So if they encounter a king wearing a golden crown, they’ll spend the whole conversation staring wide-eyed at his crown and making grabby-hands in the air towards it. Obviously, this does little to endear the cursed to anyone who owns treasure.","The cursed is contorted into a sphere. They can roll in any direction they desire, and take some actions with their arms. They are none the less limited in their ability to perform many common tasks due to their new shape.","The size of the cursed becomes variable. Each morning when they wake, roll a d6 to determine how big the cursed is this day. 1. Ant sized; 2. Housecat sized; 3. Halfling sized; 4. Adult human sized; 5. Tall as an elephant; 6. Tall as a giraffe.","Everyone who sees the cursed perceives them as an octopus struggling to survive on land. Everything the cursed says is heard as the pitiable wailing of a dying cephalopod.","The cursed needs to pee every 10 minutes.","Anytime the cursed takes damage, the wound immediately turns to gold. Since the wound cannot be healed, the hit point loss becomes permanent.","Once combat has begun, the cursed is unable to stop fighting until every foe is dead. Even those who seem like they might someday consider the possibility of becoming a foe must die.","The next time the cursed wrongs someone, that person will exaggerate the wrong into a horrible, unsympathetic crime. They will expend great effort to ensure everyone knows of the cursed’s foul nature.","The cursed becomes a natural target for pickpockets. Anytime they enter a crowd or a large community, they will lose some of their carried gold and possessions.","The cursed becomes a natural target for burglars. Each session they will lose some of their gold and possessions that are not carried with them. Hiring guards, hiding valuables, or placing valuables in a vault will provide only temporary relief. Each of these will eventually be overcome by burglars.","The cursed must always agree with the majority opinion of any group they’re in. This would include a lynch mob that wanted to have the party hanged. So long as the opinion is held by the majority, it is also the fervent opinion of the cursed.","The player to the right of the cursed selects a well known personality. A political figure or celebrity, with whom the cursed’s player is familiar. In speech, mannerism, word, and deed, the cursed must now be played as though they were that personality.","The cursed becomes a moral boyscout. They will always feel compelled to help anyone who has even the slightest need, and would never dream of accepting recompense for their efforts.","When the cursed encounters an NPC, they must make a reaction roll to determine their demeanor towards that NPC. The reaction roll is modified by the NPC’s charisma.","At the beginning of each adventure, a vulture swoops down and demands the cursed give them 500 money. If the cursed refuses, the vulture takes a bite out of their belly, pulling one of their organs free and flying off with it. The cursed takes 2 Constitution damage from this, but is otherwise unharmed. The process repeats until the cursed is dead, or starts paying the bird off. Previously taken organs can be bought back for 750 money. The vulture itself is invulnerable to attack, and can only be seen by the cursed.","Every surface the cursed stands on is as slippery as melting ice.","The cursed exaggerates everything. They regularly make promises that they cannot live up to, and make wild claims about past accomplishments.","The cursed becomes a hireling, the the cursed’s hireling becomes the player character.","Any piece of food the cursed is about to consume has a 1 in 10 chance to be poison. This poisoning occurs when a piece of food goes from being 'food,' to being 'the cursed’s food.'","The only manner of fighting the cursed can participate in is dance fighting."]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_destinations.json":
/*!****************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_destinations.json ***!
  \****************************************************************/
/*! exports provided: destinations, default */
/***/ (function(module) {

module.exports = {"destinations":["a crumbling castle ruin","a prosperous hidden village","a hidden chest of treasure","hidden pirate treasure","a hidden mine","an ancient dungeon","an underground lair","a dragon's lair","a barbarian encampment","an aquatic elf city","a cursed shrine","a blessed shrine","a thieves hideout","a hidden weapon cache","a hidden armor cache","a strange unknown area, possibly in another realm","the nearest latrine","a mundane location (across town, down the road, the local tavern, etc)","their grandma's house","a distant land","a long-lost relic","a secret brothel","a secret mystical shop","a shipwreck","a haunted house in the nearby woods","the lost city of...","the teleporting city of ... with times at certain locations","a neglected statue of some god in the nearby forest","a temple whose location was supposedly lost long ago","the tomb of Ustengrav (or some other hero or villain)","the local surrounding area with sections crossed out or marked danger","the local tourist attractions","an open portal to the feywild or another plane","the interior of a large unnamed building with an intricate route traced through the hallways","a magical watering hole where you're guaranteed to catch a fish","the best vista location up the nearest hill/mountain","make-out point"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_details.json":
/*!***********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_details.json ***!
  \***********************************************************/
/*! exports provided: details, default */
/***/ (function(module) {

module.exports = {"details":["Cursed - {{curse}}","Blessed - {{blessing}}","Owns a map to {{destination}}","Possesses {{item}}","Strangely obsessed {{obsession}}","Protected by {{entity}}","Is owed a favor by {{entity}}","Owes a favor to {{entity}}"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_entities.json":
/*!************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_entities.json ***!
  \************************************************************/
/*! exports provided: entities, default */
/***/ (function(module) {

module.exports = {"entities":["a powerful Baron","a minor merchant","a successful merchant","the local innkeeper","a nearby farmer","a minor Baron","a powerful Baroness","a minor Baroness","a minor Lord","a minor Lady","a powerful Lord","a powerful Lady","a shady thief","a deadly assassin","a powerful mage","a minor mage","a nearby innkeeper","the local blacksmith","a nearby blacksmith","a town guardsman","a local soldier","a powerful secret society","a member of a secret society","nearby druids","the local Hero","a divine being","an infernal being","a passing adventurer","a group of adventurers","a cunning spy","an otherworldly being","a coven of witches","a member of the local guard","a demon","a mermaid","an illithid","an imp","a fairy from the nearby woods","a prince from a neighboring kingdom","the king","the queen","an up and coming lich","a famous bard","an ogre","a ship (sea or air) captain","a masked vigilante"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_flaws.json":
/*!*********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_flaws.json ***!
  \*********************************************************/
/*! exports provided: flaws, default */
/***/ (function(module) {

module.exports = {"flaws":["I judge others harshly, and myself even more severely.","I put too much trust in those who wield power within my temple's hierarchy.","My piety sometimes leads me to blindly trust those that profess faith in my god.","I am inflexible in my thinking.","I am suspicious of strangers and suspect the worst of them.","Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.","I can't resist a pretty face.","I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.","I'm convinced that no one could ever fool me in the way I fool others.","I'm too greedy for my own good. I can't resist taking a risk if there's money involved.","I can't resist swindling people who are more powerful than me.","I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough.","When I see something valuable, I can't think about anything but how to steal it.","When faced with a choice between money and my friends, I usually choose the money.","If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.","I have a 'tell' that reveals when I'm lying.","I turn tail and run when things go bad.","An innocent person is in prison for a crime that I committed. I'm okay with that.","I'll do anything to win fame and renown.","I'm a sucker for a pretty face.","A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.","I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.","I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.","Despite my best efforts, I am unreliable to my friends.","The tyrant who rules my land will stop at nothing to see me killed.","I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.","The people who knew me when I was young know my shameful secret, so I can never go home again.","I have a weakness for the vices of the city, especially hard drink.","Secretly, I believe that things would be better if I were a tyrant lording over the land.","I have trouble trusting in my allies.","I'll do anything to get my hands on something rare or priceless.","I'm quick to assume that someone is trying to cheat me.","No one must ever learn that I once stole money from guild coffers.","I'm never satisfied with what I have--I always want more.","I would kill to acquire a noble title.","I'm horribly jealous of anyone who outshines my handiwork. Everywhere I go, I'm surrounded by rivals.","Now that I've returned to the world, I enjoy its delights a little too much.","I harbor dark bloodthirsty thoughts that my isolation failed to quell.","I am dogmatic in my thoughts and philosophy.","I let my need to win arguments overshadow friendships and harmony.","I'd risk too much to uncover a lost bit of knowledge.","I like keeping secrets and won't share them with anyone.","I secretly believe that everyone is beneath me.","I hide a truly scandalous secret that could ruin my family forever.","I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.","I have an insatiable desire for carnal pleasures.","In fact, the world does revolve around me.","By my words and actions, I often bring shame to my family.","I am too enamored of ale, wine, and other intoxicants.","There's no room for caution in a life lived to the fullest.","I remember every insult I've received and nurse a silent resentment toward anyone who's ever wronged me.","I am slow to trust members of other races.","Violence is my answer to almost any challenge.","Don't expect me to save those who can't save themselves. It is nature's way that the strong thrive and the weak perish.","I am easily distracted by the promise of information.","Most people scream and run when they see a demon. I stop and take notes on its anatomy.","Unlocking an ancient mystery is worth the price of a civilization.","I overlook obvious solutions in favor of complicated ones.","I speak without really thinking through my words, invariably insulting others.","I can't keep a secret to save my life, or anyone else's.","I follow orders, even if I think they're wrong.","I'll say anything to avoid having to do extra work.","Once someone questions my courage, I never back down no matter how dangerous the situation.","Once I start drinking, it's hard for me to stop.","I can't help but pocket loose coins and other trinkets I come across.","My pride will probably lead to my destruction.","The monstrous enemy we faced in battle still leaves me quivering with fear.","I have little respect for anyone who is not a proven warrior.","I made a terrible mistake in battle that cost many lives--and I would do anything to keep that mistake secret.","My hatred of my enemies is blind and unreasoning.","I obey the law, even if the law causes misery.","I'd rather eat my armor than admit when I'm wrong.","If I'm outnumbered, I always run away from a fight.","Gold seems like a lot of money to me, and I'll do just about anything for more of it.","I will never fully trust anyone other than myself.","I'd rather kill someone in their sleep than fight fair.","It's not stealing if I need it more than someone else.","People who don't take care of themselves get what they deserve."]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_gods.json":
/*!********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_gods.json ***!
  \********************************************************/
/*! exports provided: gods, default */
/***/ (function(module) {

module.exports = {"gods":["Tymora (goddess of good fortune, skill, victory, adventurers - NG,CG,CN)","Waukeen (goddess of trade, money, and wealth - LN,TN,CN)","Eldath (god of peace - CG,CN,NG)","Tyr (god of justice - LG)","Lliira (goddess of joy, happiness, dance, festivals, freedom, liberty - NG,CG,CN)","Ilmater (god of endurance, suffering, martyrdom, perseverance - LG,NG,CG)","Deneir (god of literature, art, knowledge, glyphs, images, and cartography - NG)","Chauntea (goddess of agriculture, farmers, gardeners, summer - NG)","Amaunator (former god of bureaucracy, law, order, the sun - LG)","Torm (god of duty, loyalty, obedience, paladins - LG)","Helm (god of guardians, protectors, protection - LG,LN,LE)","Azuth (god of wizards, mages, spellcasters in general - LN)","Sune (goddess of beauty, love, passion - LG,NG,CG)","Lathander (god of spring, dawn, birth, youth, vitality, athletics - NG)","Mielikki (goddess of forests, forest creatures, rangers, dryads, autumn - LG,NG,CG,TN)","Selune (goddess of the moon, stars, navigation, prophecy, questers - NG,CG,CN)","Oghma (god of knowledge, invention, inspiration, bards - TN)","Gond (god of artifice, craft, construction, smithwork - NG,TN,NE)","Milil (god of poetry, song, eloquence - LG,NG,CG)","Bahamut (god of good dragons, wind, wisdom, justice - LG)","Silvanus (god of wild nature, druids - TN)","Mystra (gddess of magic, spells, the Weave - NG)","Akadi (goddess of movement and speed - TN)","Shaundakul (god of wind, portals, travel, exploration, caravans - CG,CN,CE)","Grumbar (god of elemental earth, solidity, changelessness, oaths - TN)","Lurue (goddess of intelligent beasts, talking beasts - NG,CG,CN)","Ubtao (god of creation, jungles, Chult, the Chultans, dinosaurs - TN)","Istishia (god of elemental water, purification, wetness - TN)","Kelemvor (god of death, the dead - LN)","Kossuth (god of elemental fire, purification through fire - TN)","Tempus (god of war, battle, warriors - CN)","Lord Ao - (overgod - TN)","Malar (god of the hunt, evil lycanthropes, bestial savagery, and bloodlust - LE,NE,CE)","Umberlee (goddess of oceans, currents, waves, sea winds - CN,NE,CE)","Beshaba (god of bad luck, misfortune, random mischief, and accidents - CN,NE,CE)","Auril (goddess of cold, winter - NE)","Mask (god of thieves, thievery, shadows - NE)","Loviator (goddess of pain, hurt, agony, torment, suffering, torture - LN,LE,NE)","Tiamat (goddess of evil dragons, evil reptiles, greed - LE)","Talona (goddess of poison, disease, plague - CE)","Lolth (goddess of Drow, spiders, darkness, chaos, evil, assassination - CE)","Shar (goddess of dark, night, loss, forgetfulness, unrevealed secrets, caverns, dungeons, the Underdark - NE)","Cyric (god of murder, lies, intrigue, strife, illusion - CE)","Talos (god of storms, destruction, rebellion, conflagrations, earthquakes - CE)","Bane (god of hatred, fear, tyranny - LE)","Asmodeus (god of sin, King of the Nine Hells - LE)","Velsharoon (god of necromancy - LN,NE,CN)"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_hooks.json":
/*!*********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_hooks.json ***!
  \*********************************************************/
/*! exports provided: hooks, default */
/***/ (function(module) {

module.exports = {"hooks":["has been enslaved by {{entity}}.","is being blackmailed by {{entity}} into challenging a PC to a duel to the death.","is a werewolf and is looking for acceptance within society.","is actually a bronze dragon.","needs help finding {{item}}.","is spying on the players on behalf of {{entity}}.","has recently obtained a map to {{destination}}","has a duel to the death on the morrow but is afraid of losing.","needs help sabotaging a contest (horse race, arm wrestle, duel, pie eating, etc).","is being haunted by the ghost of their dead partner.","needs help stealing {{item}}.","is a time traveller from a distant past, obsessed with finding the treasure they buried thousands of years ago.","is obsessively in love with {{entity}} who is locked up in their basement.","has angered {{entity}} and needs help avoiding the consequences.","needs help exorcising their {{relative}}.","is part of a secret rebellious organization who wants to take control of the government.","is actually a doppleganger who killed {{entity}} and is living their life.","gives the PCs a {{item}}. Turns out they had stolen it from {{entity}} who is hellbent on recovering it.","has a home infested by zombies.","has recently woken up with a magical rune on their arm, foot, forehead, etc.","needs help gathering information on {{entity}}.","needs help organizing a contest (archery, drinking, strength, intelligence, hunting, etc).","is being constantly pranked by {{entity}}.","is obsessed {{obsession}}.","needs help investigating a mysterious fire that burned down their house.","has been hired to steal items from the PCs.","is currently being chased by law enforcement and asks the PCs for protection.","is looking for their lost son/daughter, who never actually existed.","is possessed by an evil spirit during the day and can only control themself at night.","is currently chasing a bandit and asks the PCs for help.","has been pressured by local drug dealers into selling drugs.","is addicted to drugs and is looking to score.","was tricked into wearing a cursed robe by {{entity}}.","is a cannibal.","is the host of a terrible and deadly sickness.","has recently come into possession of a powerful magical trinket, and nobody knows how.","has recently come into a lot of gold, and nobody knows how.","is a secret vigilante, and considers the PCs a threat to society.","is openly a vampire/lycanthrope.","is being harassed by {{entity}} and wants revenge.","lives with a beast/monster/succubus/demon as their lover and just wishes to be accepted by society.","is strangely followed by multiple animals at all time.","wants the PCs help to tame a beast (troll, wolf, imp, fairy, etc).","has been cursed ({{curse}}) by a Wizard/Hag/Demon/etc)","needs the party to deliver {{item}} to {{entity}}."]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_ideals.json":
/*!**********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_ideals.json ***!
  \**********************************************************/
/*! exports provided: ideals, default */
/***/ (function(module) {

module.exports = {"ideals":["Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.","Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.","Charity. I always try to help those in need, no matter what the personal cost.","Change. We must help bring about the changes the gods are constantly working in the world.","Power. I hope to one day rise to the top of my faith's religious hierarchy.","Aspiration. I seek to prove my self worthy of my god's favor by matching my actions against his or her teachings.","Independence. I am a free spirit--no one tells me what to do.","Fairness. I never target people who can't afford to lose a few coins.","Charity. I distribute money I acquire to the people who really need it.","Creativity. I never run the same con twice.","Friendship. Material goods come and go. Bonds of friendship last forever.","Aspiration. I'm determined to make something of myself.","Honor. I don't steal from others in the trade.","Freedom. Chains are meant to be broken, as are those who would forge them.","Charity. I steal from the wealthy so that I can help people in need.","Greed. I will do whatever it takes to become wealthy.","People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care.","Redemption. There's a spark of good in everyone.","Beauty. When I perform, I make the world better than it was.","Tradition. The stories, legends, and songs of the past must never be forgotten.","Creativity. The world is in need of new ideas and bold action.","Greed. I'm only in it for the money and fame.","People. I like seeing the smiles on people's faces when I perform. That's all that matters.","Honesty. Art should reflect the soul; it should come from within and reveal who we really are.","Respect. People deserve to be treated with dignity and respect.","Fairness. No one should get preferential treatment before the law, and no one is above the law.","Freedom. Tyrants must not be allowed to oppress the people.","Might. If I become strong, I can take what I want--what I deserve.","Sincerity. There's no good pretending to be something I'm not.","Destiny. Nothing and no one can steer me away from my higher calling.","Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization.","Generosity. My talents were given to me so that I could use them to benefit the world.","Freedom. Everyone should be free to pursue his or her livelihood.","Greed. I'm only in it for the money.","People. I'm committed to the people I care about, not to ideals.","Aspiration. I work hard to be the best there is at my craft.","Greater Good. My gifts are meant to be shared with all, not used for my own benefit.","Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking.","Free Thinking. Inquiry and curiosity are the pillars of progress.","Power. Solitude and contemplation are paths toward mystical or magical power.","Live and Let Live. Meddling in the affairs of others only causes trouble.","Self-Knowledge. If you know yourself, there're nothing left to know.","Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity.","Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine.","Independence. I must prove that I can handle myself without the coddling of my family.","Power. If I can attain more power, no one will tell me what to do.","Family. Blood runs thicker than water.","Noble Obligation. It is my duty to protect and care for the people beneath me.","Change. Life is like the seasons, in constant change, and we must change with it.","Greater Good. It is each person's responsibility to make the most happiness for the whole tribe.","Honor. If I dishonor myself, I dishonor my whole clan.","Might. The strongest are meant to rule.","Nature. The natural world is more important than all the constructs of civilization.","Glory. I must earn glory in battle, for myself and my clan.","Knowledge. The path to power and self-improvement is through knowledge.","Beauty. What is beautiful points us beyond itself toward what is true.","Logic. Emotions must not cloud our logical thinking.","No Limits. Nothing should fetter the infinite possibility inherent in all existence.","Power. Knowledge is the path to power and domination.","Self-improvement. The goal of a life of study is the betterment of oneself.","Respect. The thing that keeps a ship together is mutual respect between captain and crew.","Fairness. We all do the work, so we all share in the rewards.","Freedom. The sea is freedom--the freedom to go anywhere and do anything.","Master. I'm a predator, and the other ships on the sea are my prey.","People. I'm committed to my crewmates, not to ideals.","Aspiration. Someday I'll own my own ship and chart my own destiny.","Greater Good. Our lot is to lay down our lives in defense of others.","Responsibility. I do what I must and obey just authority.","Independence. When people follow orders blindly they embrace a kind of tyranny.","Might. In life as in war, the stronger force wins.","Ideals aren't worth killing for or going to war for.","Nation. My city, nation, or people are all that matter.","Respect. All people, rich or poor, deserve respect.","Community. We have to take care of each other, because no one else is going to do it.","Change. The low are lifted up, and the high and mighty are brought down. Change is the nature of things.","Retribution. The rich need to be shown what life and death are like in the gutters.","People. I help people who help me--that's what keeps us alive.","Aspiration. I'm going to prove that I'm worthy of a better life."]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_items.json":
/*!*********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_items.json ***!
  \*********************************************************/
/*! exports provided: items, default */
/***/ (function(module) {

module.exports = {"items":["a miniature, tame mimic","a murder contract with the name left empty","a 1-pound egg with a bright red shell","a small, weightless stone block","a nightcap that, when worn, gives you pleasant dreams","a small packet filled with pink dust","a vial of dragon blood","a metal urn containing the ashes of a hero","a scrap of cloth from an old banner","a scrap of cloth from an old banner","a shard of obsidian that always feels warm to the touch","a gold coin minted in an unknown land","a single bloodstained tarot card: The Seven of Swords (signifying betrayal and deception)","a decrepit, and slightly malodourous, preserved rabbit's foot on a metal chain. Anyone who keeps the foot for a day increases their maximum Luck by 1 point.The Luck point is lost if the owner is separated from the lucky foot","an intricate eyeglass shaped in the likeness of a yellow cat's eye","a varnished case containing a string of garlic, two wooden stakes and a silver cross","a folded piece of parchment reveals a charcoal sketch of a stunning young woman. A wide lake and a large tree split by lightning are depicted behind her","a dog whistle fashioned of bone. When used at night, there is a 50% chance of a wild dog with a patch eye appearing from the wilderness. The dog is smart, brave, and friendly to the owner, happy to keep watch or perform other minor tasks if well treated. The dog disappears back into the wilderness every dawn","a six inch clockwork knight, made up of patchwork metal parts. If wound, the knight shuffles forward about 10 ft, whirring and clicking, before making a single strike with his miniature sword","a completely sealed, six inch oak barrel, with sloshing liquid inside","one half of a white gold two halves heart necklace. Inscribed on the back are the words Till next we meet","a kraken like statuette, carved from blue and white coral","a famous calligrapher's personal brush","a belt buckle stolen from a noble or a king","the head of a mummy","a magically shrunken goblin in a tiny cage","a bottle of rum that never runs out","a lava stone carved to look like a flame, it gives off endless heat","a tiny hat that makes you feel very confident whilst wearing it","a life-sized statue of a gnome","a legal deed for a house that doesn't seem to exist","the deed to an invisible hut, at least, that's what they claim","an angry looking fairy in a jar","a horseshoe once worn by a unicorn","the hilt from a great hero's broken sword","a jar of live bees","a potion that induces vomiting","a deed to a damaged tower keep","a deed to an abandoned mine","a deed to an abandoned castle","a deed to an abandoned keep","a deed to an overrun keep","a deed to an overrun castle","a deed to an overrun mine","a deed to an overrun tower keep","a strange book in an unknown language","a map to the nearest latrine","a map of the local stars","a soldier's medal","a letter of recommendation","an elaborate key to an unknown door","a tiny brass clockwork cathedral that plays organ music when wound","a bag of one-hundred marbles, ninety-nine are white and the other is black","a roc's feather","a soldier doll of an empire long-forgotten","a small mechanical snapping turtle","a piece of torn red cloth bearing a royal insignia","a preserved eyeball attached to a spindly eye-stalk, the nerves twitch occasionally","a wooden puzzle box that you have not solved","a shrunken head","an hourglass filled with glowing sand that falls slower or faster than it should","an obsidian icon of a forgotten deity","a recorder carved from brilliant white ash","a scroll case and scroll scribed with an unfinished spell","a small stone that shifts through the color spectrum over the course of a week","a candle whose flame produces no heat nor can it be extinguished or transfer its flame","a leather necklace lined with troll fangs","a small piece of gelatinous cube that slightly stings the skin, prolonged exposure may cause a rash","a hefty piece of magnetic ore that fell from the skies","a mining pick made from bone","a bag full of tiny mummified frogs","a box containing a mold for a cast iron key","a compass that always points to where you were moments ago","a small jewelry box containing three perfectly round and smooth stones","a wooden coin that weighs and sounds like metal","a tiny soapstone octopus that slowly absorbs water","a glass lamp with a tiny star suspended inside","a petrified heart that leaks an oily black substance","a harp which strings play notes you can only hear after sunset","a pair of old books written in a lost language","a map with a large patch of ocean torn out","a pair of tetrahedral clay dice that always add up to five when rolled together","a pair of glasses that make you invisible to yourself","a small frozen glass-like flame that subtly melts and refreezes, morphing over time","a pewter ring with an inlaid gold band that slowly rotates","a hand mirror that shows everyone's reflection except your own","a horn that when blown through produces no sound","a freshly-excavated humanoid skeleton the size of your hand","a broken sword hilt with strange runes on the remains of the blade","a crow's claw","a thin metal rod that plays out a tune when repeatedly tapped","a heavy metal coin that floats on water","a glass bone","a bouncing ball made of a strange spongy wood","a small crate box filled with burlap sacks of different exotic coffee beans","a small mass of grey metallic ooze that can be stretched but not pulled apart","a letter from a relative adressing you by a different name","a stone statue of a god with an creature's head","a small piece of rock that floats almost impercievably above the ground","a dagger, simple and sharp, that is incapable of hurting you","a pair of copper snake earrings of elven design","a very small and furry creature that always sleeps and never eats","a grime encrusted bone ring","a magical acorn","a green leather pouch full of berries that will never rot","a silver and glass inkwell that cannot spill","a child's diary","a cloak lined with a strange blue fur","a small crystal sphere that illuminates under starlight","an odd pocket-sized gizmo that forecasts severe winds and rain coming your way","a hand sized bell with no clapper but it still rings when played","a right arm broken off from a statue","a glass bottle that spins and points to the same place when left alone","an antique sword, rusted to the scabbard","a strange barbed choker that makes your voice more resonant","a small piece of fabric that still holds the scent of a lost love","a rock with a patch of curious purple moss","a wooden carving of a strange unknown beast","a spherical astrolabe that tracks the movements of the planes","an ivory hair comb that changes your hair color subtly after repeated use","a razor-sharp piece of metal wrapped in a bloody bandage","a heavy rust-covered metal rod that whispers words only you hear","a slender wooden twig which cannot be broken by any man","a hand puppet that very much resembles another party member","a wooden leg with a hidden compartment","a clay teapot that fills itself with fresh hot tea every morning","a small rabbit-fur pouch filled with ceremonial herbs and incense","a piece of volcanic rock that has never completely cooled down","a tiny oragami spider that ocassionaly skitters about on its own","a small dark glass corked bottle filled to the brim with a powerful liquor","a piece of a castle wall with a map chalked onto one side","a small pouch of ashes that will remove ink from the pages they are smeared on","a pocket-watch that started running backwards the moment you picked it up","a rope belt that can extend to fifty feet","a rare copy and translation of a religious manuscript","a magical signet-ring that leaves a seal in wax that only the person or people you designate can see","a gnarled walking staff of living wood that can manipulate tiny objects while you hold it","a perfect forgery of a small masterpiece work of art","a pair of magically linked bits of gemstone, holding one lets you sense the direction of the other","a tuning fork that produces the most satisfying note anyone that hears it has ever heard","a musical washboard made of monster bones","a merchant's scale you can adjust with a handwave to weigh slightly in your favor","a necklace of varyingly spherical and odd-shaped shimmering stones that gives the wearer prophetic dreams","a quiver of twenty arrows that degrade quickly after impact, leaving no trace","a small log that burns as hot as a roaring campfire and never turns to ash","an unfinished autobiography","a large piece of shell from a dragon's egg"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_life_events.json":
/*!***************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_life_events.json ***!
  \***************************************************************/
/*! exports provided: life-events, default */
/***/ (function(module) {

module.exports = {"life-events":["recently released from prison","{{relative}} recently sent to prison","is planning a vacation soon (to a nearby major city, or other exotic location)","just got back from vacation (at a nearby major city, or other exotic location)","recently learned their {{relative}} is addicted to drugs","recently had a birthday","today is their birthday","{{relative}}'s birthday","pet recently died","recently got a new pet","their {{relative}} recently died","their {{relative}} is on their death bed","recently moved to town","about to move to a new town","recently changed jobs, used to be a {{profession}}","was just fired from their job","was just hired","throwing a party in the next couple days","planning to go see their {{relative}} who lives far from here","{{relative}} just got married","{{relative}} is getting married soon","{{relative}} just got divorced","{{relative}} just had a baby","{{relative}} is about to have a baby","{{relative}} just converted to {{god}}","just bought their first house","their house was recently destroyed by a fire","unintentionally broke a minor law and is feeling guilty about it","someone in town has recently started bullying them on a regular basis","just found out about an unplanned pregnancy","recently had a brush with death, is missing a limb, fingers, or toes","just contracted a disease with some external symptoms (green skin, cough, hair falling out, etc)","recently lost a priceless family heirloom due to forgetfulness, theft, natural disaster, etc","had been turned into a toad by an unknown force and just recently returned to normal form","had been held prisoner by a dragon, mind flayer, vampire, etc until adventurers recently killed it","recently escaped from being held captive by a hag, cult, demon, etc and is afraid they will find them again"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_motivations.json":
/*!***************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_motivations.json ***!
  \***************************************************************/
/*! exports provided: motivations, default */
/***/ (function(module) {

module.exports = {"motivations":["Greed","Power","Ambition","Desire for acceptance","Curiosity","Independence","Order","Social contact","Social status","Justice","Revenge","Vengeance","Hatred","Dishonor","Pride","Lust","Jealousy","Loyalty","Honor","Obedience","Unfulfillment","A need to improve inequality","Desire","Failure","Survival","Hope for the future","Love","Cowardice","Family","Reputation","Sense of accomplishment","Basic needs","Necessity","Personal pride","A desire to change the world around them","Tales of old heroes","A family legacy","Past mistakes","Stubbornness","Wealth & Status","Prestige","Competitive spirit","Personal goals or dreams","Fear of death","Fear of pain","Fear of humiliation","Fear of rejection","Fear of loss","Fear of regret","Fear of shame"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_obsessions.json":
/*!**************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_obsessions.json ***!
  \**************************************************************/
/*! exports provided: obsessions, default */
/***/ (function(module) {

module.exports = {"obsessions":["with rocks","with birds","with feathers","with money","with insects","with leaves","with weapons","with armors","with taxidermy","by a specific mundane item (table, rock, candlesticks, etc)","by a specific type of animal (wolves, birds, bears, etc)","by a specific type of creature (skeletons, harpies, giants, etc)","with magic","by a specific school of magic (any)","with towels & traveler's guides","with cleanliness","with shoes","with the number 3","with cleanliness"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_personalities.json":
/*!*****************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_personalities.json ***!
  \*****************************************************************/
/*! exports provided: personalities, default */
/***/ (function(module) {

module.exports = {"personalities":["Abrasive","Abrupt","Absentminded","Accessible","Active","Adaptable","Admirable","Adventurous","Aggressive","Agonizing","Agreeable","Aimless","Airy","Alert","Allocentric","Aloof","Ambitious","Amiable","Amoral","Amusing","Angry","Anticipative","Anxious","Apathetic","Appreciative","Arbitrary","Argumentative","Arrogant","Artful","Articulate","Artificial","Ascetic","Asocial","Aspiring","Assertive","Astigmatic","Athletic","Attractive","Authoritarian","Balanced","Barbaric","Benevolent","Bewildered","Big-thinking","Bizarre","Bland","Blunt","Boisterous","Boyish","Breezy","Brilliant","Brittle","Brutal","Businesslike","Busy","Calculating","Callous","Calm","Cantakerous","Capable","Captivating","Careless","Caring","Casual","Cautious","Challenging","Charismatic","Charming","Charmless","Cheerful","Childish","Chummy","Circumspect","Clean","Clear-headed","Clever","Clumsy","Coarse","Cold","Colorful","Colorless","Companionly","Compassionate","Competitive","Complacent","Complaintive","Complex","Compulsive","Conceited","Conciliatory","Condemnatory","Confident","Confidential","Conformist","Confused","Conscientious","Conservative","Considerate","Constant","Contemplative","Contemptible","Contradictory","Conventional","Cooperative","Courageous","Courteous","Cowardly","Crafty","Crass","Crazy","Creative","Cerebral","Criminal","Crisp","Critical","Crude","Cruel","Cultured","Curious","Cute","Cynical","Daring","Debonair","Decadent","Deceitful","Decent","Deceptive","Decisive","Dedicated","Deep","Delicate","Demanding","Dependent","Desperate","Destructive","Determined","Devious","Difficult","Dignified","Directed","Dirty","Disciplined","Disconcerting","Discontented","Discouraging","Discourteous","Discreet","Dishonest","Disloyal","Disobedient","Disorderly","Disorganized","Disputatious","Disrespectful","Disruptive","Dissolute","Dissonant","Distractible","Disturbing","Dogmatic","Dominating","Domineering","Dramatic","Dreamy","Driving","Droll","Dry","Dull","Dutiful","Dynamic","Earnest","Earthy","Easily Discouraged","Ebullient","Educated","Effeminate","Efficient","Egocentric","Elegant","Eloquent","Emotional","Empathetic","Energetic","Enervated","Enigmatic","Enthusiastic","Envious","Erratic","Escapist","Esthetic","Excitable","Exciting","Expedient","Experimental","Extraordinary","Extravagant","Extreme","Fair","Faithful","Faithless","False","Familial","Fanatical","Fanciful","Farsighted","Fatalistic","Fawning","Fearful","Felicific","Fickle","Fiery","Firm","Fixed","Flamboyant","Flexible","Focused","Folksy","Foolish","Forceful","Forgetful","Forgiving","Formal","Forthright","Fraudulent","Freethinking","Freewheeling","Friendly","Frightening","Frivolous","Frugal","Fun-loving","Gallant","Generous","Gentle","Genuine","Glamorous","Gloomy","Good-natured","Graceless","Gracious","Grand","Greedy","Grim","Guileless","Gullible","Hardworking","Hateful","Haughty","Healthy","Hearty","Hedonistic","Helpful","Heroic","Hesitant","Hidebound","High-handed","High-minded","High-spirited","Honest","Honorable","Hostile","Humble","Humorous","Huried","Hypnotic","Iconoclastic","Idealistic","Idiosyncratic","Ignorant","Imaginative","Imitative","Impassive","Impatient","Impersonal","Impractical","Impressionable","Impressive","Imprudent","Impulsive","Incisive","Inconsiderate","Incorruptible","Incurious","Indecisive","Independent","Individualistic","Indulgent","Inert","Inhibited","Innovative","Inoffensive","Insecure","Insensitive","Insightful","Insincere","Insouciant","Insulting","Intelligent","Intense","Intolerant","Intuitive","Invisible","Invulnerable","Irascible","Irrational","Irresponsible","Irreverent","Irritable","Kind","Knowledge","Lazy","Leaderly","Leisurely","Liberal","Libidinous","Logical","Loquacious","Lovable","Loyal","Lyrical","Magnanimous","Malicious","Mannered","Mannerless","Many-sided","Masculine","Maternal","Maticulous","Mature","Mawkish","Mealymouthed","Mechanical","Meddlesome","Melancholic","Mellow","Meretricious","Messy","Methodical","Miserable","Miserly","Misguided","Mistaken","Moderate","Modern","Modest","Money-minded","Monstrous","Moody","Moralistic","Morbid","Muddle-headed","Multi-leveled","Mystical","Naive","Narcissistic","Narrow","Narrow-minded","Natty","Neat","Negativistic","Neglectful","Neurotic","Neutral","Nihilistic","Nonauthoritarian","Noncommittal","Noncompetitive","Obedient","Objective","Obnoxious","Observant","Obsessive","Obvious","Odd","Offhand","Old-fashined","One-dimensional","One-sided","Open","Opinionated","Opportunistic","Oppressed","Optimistic","Orderly","Ordinary","Organized","Original","Outrageous","Outspoken","Overimaginative","Painstaking","Paranoid","Passionate","Passive","Paternalistic","Patient","Patriotic","Peaceful","Pedantic","Perceptive","Perfectionist","Personable","Persuasive","Perverse","Petty","Pharissical","Phlegmatic","Physical","Placid","Planful","Playful","Plodding","Polished","Political","Pompous","Popular","Possessive","Power-hungry","Practical","Precise","Predatory","Predictable","Prejudiced","Preoccupied","Presumptuous","Pretentious","Prim","Principled","Private","Procrastinating","Profligate","Profound","Progressive","Protean","Protective","Proud","Providential","Provocative","Prudent","Pruposeful","Pugnacious","Punctual","Pure","Puritanical","Questioning","Quiet","Quirky","Racist","Rational","Reactionary","Reactive","Realistic","Reflective","Regimental","Regretful","Relaxed","Reliable","Religious","Repentant","Repressed","Resentful","Reserved","Resourceful","Respectful","Responsible","Responsive","Restrained","Retiring","Reverential","Ridiculous","Rigid","Ritualistic","Romantic","Rowdy","Ruined","Rustic","Sadistic","Sage","Sanctimonious","Sane","Sarcastic","Scheming","Scholarly","Scornful","Scrupulous","Secretive","Secure","Sedentary","Self-conscious","Self-critical","Self-defacing","Self-denying","Self-indulgent","Self-reliant","Self-sufficent","Selfish","Selfless","Sensitive","Sensual","Sentimental","Seraphic","Serious","Sexy","Shallow","Sharing","Shortsighted","Shrewd","Shy","Silly","Simple","Single-minded","Skeptical","Skillful","Sloppy","Slow","Sly","Small-thinking","Smooth","Sober","Sociable","Soft","Soft","Softheaded","Solemn","Solid","Solitary","Sophisticated","Sordid","Spontaneous","Sporting","Stable","Steadfast","Steady","Steely","Stern","Stiff","Stoic","Stolid","Strict","Strong","Strong-willed","Stubborn","Studious","Stupid","Stylish","Suave","Subjective","Submissive","Subtle","Superficial","Superstitious","Surprising","Suspicious","Sweet","Sympathetic","Systematic","Tactless","Tasteful","Tasteless","Teacherly","Tense","Thievish","Thorough","Thoughtless","Tidy","Timid","Tolerant","Tough","Tractable","Transparent","Treacherous","Trendy","Troublesome","Trusting","Unaggressive","Unambitious","Unappreciative","Uncaring","Unceremonious","Unchanging","Uncharitable","Uncomplaining","Unconvincing","Uncooperative","Uncreative","Uncritical","Unctuous","Undemanding","Understanding","Undisciplined","Undogmatic","Unfathomable","Unfoolable","Unfriendly","Ungrateful","Unhealthy","Unhurried","Unimaginative","Unimpressive","Uninhibited","Unlovable","Unpatriotic","Unpolished","Unpredicatable","Unprincipled","Unrealistic","Unreflective","Unreliable","Unreligious","Unrestrained","Unself-critical","Unsentimental","Unstable","Upright","Urbane","Vacuous","Vague","Venal","Venomous","Venturesome","Vindictive","Vivacious","Vulnerable","Warm","Weak","Weak-willed","Well-bred","Well-meaning","Well-read","Well-rounded","Whimsical","Willful","Winning","Wise","Wishful","Witty","Youthful","Zany"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_professions.json":
/*!***************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_professions.json ***!
  \***************************************************************/
/*! exports provided: professions, default */
/***/ (function(module) {

module.exports = {"professions":["Abbot","Acolyte","Actor","Adventurer","Advisor","Alchemist","Apothecary","Archeologist","Architect","Armorer","Artist","Astrologer","Baker","Bandit","Banker","Barber/Hairdresser","Baron / Baroness","Bartender","Basketweaver","Beast-Tamer (Circus)","Beekeeper","Beggar","Blacksmith","Bodyguard","Botanist","Bounty Hunter","Brewer","Brigand","Brothel Owner","Brothel Worker","Burglar","Butcher","Calligrapher","Carpenter","Cartographer","Cartwright (Cart Maker)","Chandler (Candle Maker)","Charlatan","City Guard","Civic Engineer","Cobbler","Composer","Con Artist","Construction Worker","Cook/Chef","Cooper (Barrel Maker)","Councilman / woman","Courier","Crier","Dairymaid","Dancer","Diplomat","Dock Worker","Dung Carter","Elder / Chief","Elected Official","Engineer","Engraver","Explorer","Falconer","Farmer","Farm-Hand","Fence (criminal)","Ferryman","Fisher","Fletcher","Forester","Gemcutter","Geneologist","General Laborer","Gilder","Glassblower","Goatherder","Government Official","Governor","Grain Farmer","Gravedigger","Guide","Guildmaster","Hatmaker","Hawker","Healer","Herbalist","Historian","Horse Trainer","Hunter","Innkeeper","Jester","Jeweler","Judge","Knight","Landlord","Lantern Lighter","Latrine Digger","Lawyer","Leatherworker","Librarian","Locksmith","Maid","Mason","Master of Horses","Master of Hounds","Mayor","Mercenary","Merchant of Aphrodisiacs","Merchant of Pets/Animals","Merchant of Medicine/Homeopathic Remedies","Merchant of Weapons","Merchant of Licenses","Merchant of Crafting Materials","Merchant of Furniture","Merchant of Transportation/Guide","Merchant of Food/Spices","Merchant of Books/Information","Merchant of Clothing","Merchant of Art","Merchant of Slaves","Merchant of Antiques","Merchant of Drugs","Merchant of General Goods","Merchant of Second-Hand Goods","Messenger","Military Tactician","Militia","Miller","Miner","Minstrel","Mortician","Musician","Painter","Peddler","Performer","Perfumer","Pickpocket","Pig Farmer","Playwrighter","Poacher","Poet","Politician","Potter","Priest","Printer / Copier","Privycleaner","Quilter","Rancher","Rat Catcher","Ringman (Circus)","Saddle Maker","Sailor","Scholar","Scout","Scribe","Scribe's Assistant","Sculpter","Servant","Shipwright","Ship Captain","Sheepshearer","Shepherd","Shoemaker","Silversmith","Singer","Smuggler","Soldier","Spy","Squire","Stable-hand","Stable-Master","Stonecutter","Storyteller","Surveyor","Tailor","Tanner","Tax collector","Teacher","Thatcher","Thief","Thug","Tinker","Toll Guard","Town Drunk","Tracker","Trapper","Treasurer","Tumbler","Unemployed","Waitress / Waiter","Wandering Trader","Weaponsmith","Weaver","Whore","Woodcutter","Writer"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_quirks.json":
/*!**********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_quirks.json ***!
  \**********************************************************/
/*! exports provided: quirks, default */
/***/ (function(module) {

module.exports = {"quirks":["has a constant wanderlust and is unable to live at the same place for more than a few months","doesn't like change","likes to speak in proverbs","misquotes proverbs","falls in and out of love easily","believes in soulmates and destiny","is always joking, even at innapropriate times","has a joke for every situation","doesn't like listening to jokes","is constantly flattering people","is a compulsive gambler","is an alcoholic","never lies","constantly lies","believes in whatever deity is most helpful to them at any given moment","is a kleptomaniac","always does what they're told not to","gets very mad at any semblance of an insult","has a story for everything","sees insults as an art","is a cross-dresser","runs everywhere instead of walking","dreams of becoming rich and famous","admires the local lord","knows all the gossip around town","is always sharing their wisdom","believes in destiny","argues about everything","spaces out often, lost in thought","makes anyone they speak to feel like the most important person in the world","cares about their friends and will do anything for them","reads every book they comes across","loves discovering new mysteries and solving them","wants to know every side of a story before expressing an opinion","is paranoid","works hard to play hard afterwards","stretches the truth to tell a good story","is haunted by horrible memories","has lost many friends","has a crude sense of humour","likes finding direct solutions to problems","always carries food in their pockets","always asks invasive questions","is a local sports champion","laughs at inappropriate times","doesn't like their current profession, has always dreamed of becoming a {{profession}}","believes that all {{race}} are planning to destroy the world","owns a box full of dead animals","is allergic to apples","believes that they are related to the god {{god}}","lies poorly on purpose","secretly wants to become the ruler of the city","has a pet insect","likes to swim","has a beautiful singing voice","often thinks aloud","cannot tolerate rough living conditions","uses long words to sound smart","gives money to the poor","disregards poorer people","only dresses in very expensive clothes","always wears a fancy hat","loves partying","uses a beautiful walking cane","wears a lot of cheap jewelry","wears a lot of beautiful jewelry","wears fancy spectacles","likes to know how things work","considers everyone else as idiots","has very little practical experience","sees divine omens in everything","talks aloud to their god","quotes sacred texts","misquotes sacred texts","is very intolerant towards other faiths","carries blessed water everywhere","spends a lot of time studying other religions","carries out a complicated religious ritual every morning","will frequently pray at inappropriate moments","tries to convert everyone they meet","idolizes a religious hero","is disgusted by human architecture","feels more comfortable while surrounded by nature","is secretly captivated by dwarves","has a deep knowledge of ancient secrets","has a deep knowledge of ancient magic","knows the name of all the local plants","will only speak common if absolutely forced to","never knows the current time and date","paints exquisite paintings in their spare time","paints horrendous paintings in their spare time","uses terms from a different language as they speak","is always late","seeks extreme mastery of what they do","sees other races as inferior","keeps all of their promises","despises fear and cowardice","treats adversaries/enemies/criminals with respect","values honor above all","has a secret dragon master","always has a good ale at hand","feels ill at ease in open spaces","is more comfortable underground","constantly hums old dwarven songs","misses the world as they used to know it","is strongly rooted within tradition","will take on any bet while drinking","is always covered in dirt","has almost never been above ground","cannot take a halfling seriously","harbours a deep hatred of orcs and goblins","has gemcutting as a hobby","is secretly captivated by elves","makes the best out of any situation","is always tinkering in their free time","has a solution for everything","explains everything in great detail","has a fascination with explosions","never stops talking","complicates simple situations","is always scribbling notes","keeps a very precise journal","always has plans for a new invention","has a detailed map of everywhere they have been to","loves shiny objects","has a fascination with alchemy","is fascinated by magic and its history","is way too curious","talks so fast that they are very difficult to understand","tries to stay home as much as possible","usually tries not to get noticed","is very shy","has several pet animals","rides a poney everywhere","always has a good joke to tell","knows all there is to know about farms","lived their early years in a caravan","never goes anywhere without their friend","smiles constantly","values their community very highly","spends every morning training","will never say no to a duel","can see an opening in any defense","sees fighting as a solution to any problem","judges people on their fighting/karate skills","used to be bullied as a child and learned to fight so that it wouldn't happen again","always obeys their elders/superiors","always has a battle story to tell","likes animals more than people","is a vocal vegetarian","is a vegetarian","often talks to plants","feels uncomfortable in a urban setting","is a very proficient herbalist","can make a potion out of anything","sleeps best in a tree","can always find their way in the woods","loves eating fresh aliments","can tame any animal","will never take a life if given the choice","feels uncomfortable in a rich setting","frequently misuses long words to sound smarter","is totally oblivious to etiquette and social expectations","enjoys tavern brawls","has no concept of propriety","always has time to help others","sleeps fully dressed, ready to run","always knows where to hide","always eats like it's their last meal","shares everything they own","never bathes","only wears red (or some other color) clothing","never takes off their shoes","never wears footwear","always wears a mask","never sleeps in a bed","never sits on a chair","speaks only in riddles","doesn't tolerate nicknames","has an imaginary friend","knows thieve's cant","often spaces out and stares into the distance","is always chewing something","bites their fingernails","twirls their hair or strokes their beard","addicted to substance","hates magic","kleptomaniac","obsessed with magic","hatred/fear of killing","bad manners/vulgar","expensive taste","leaves no one behind","too proud to ask for help","fears the gods","doesn't know the common tongue","superstitious","never refuses a challenge/extremely competitive","obsessed with a god","has an injury","receives visions (insane)","owes a large debt","fugitive","haunted","fear of common hazard (fire, water, heights, animals, darkness, insects, magic)","hunted by something/believes they are being hunted by something","moral code","secretly evil (and must keep it a secret)","magical curse (inhibits certain type of interaction, action, or activity)","prophesied to die soon by a fortune teller and believes it","has a terrible secret","servant to a hidden master","has a great past sorrow","multiple personalities","irresponsible with money","socially inept","trusts nobody","dormant behavioral conditioning program","traditionalist","apologist/condoning","conspiracy theorist","responsible for a terrible event","blames something or someone for a great sorrow","naive","breaks hearts","faints at the sight of blood","collector","in love with someone horrible or forbidden","obsessed with fitness","terrible liar","no sense of smell","illiterate","extremely shy","obsessed with justice","overconfident/arrogant","self-deprecating","plagued by nightmares","fiery temper/anger issues","parties too hard/over-indulgent","trusting","easily seduced","hypochondriac","compulsive liar","oblivious","extremely greedy/will do anything for money","chronic illness","fears building close relationships","thrill-seeker","social conformist","authority issues","obsessed with personal hygiene","was involved in a huge scandal","attracts a lot of attention/very large","notorious","extremely vain","self-righteous","altruistic","avenging","devoted to one of the player characters","pretender/heir to distant throne or ruined kingdom","pyromaniac","impoverished noble","psychological trauma","dependent upon an item for an ability score/incredibly weak without a certain item","hears voices","suffers from chronic pain (magical or non-magical)","no patience/impulsive","constantly seeks out fortune tellers, palm readers, tarot card readers, good luck charms","paranoid","running from the past","pet collector/animal-lover","taken a vow of silence","pack rat/hoarder","needs medicine to live","absent-minded (randomly forgets/loses things)","addicted to gambling","prone to jealousy of others' success","contempt for nobility","only eats a certain food","contempt for the comforts of civilization","needs certain conditions to sleep (certain item(s), can't sleep alone, etc.)","vendetta against type of monster","romanticizes everything","reads signs and omens","fears magic","is always muttering about something","is constantly eating","is constantly joking","is constantly smiling","has a strange theory about the world. Wants to tell everyone about it.","movies like a cat","is always overdressed for the occasion","wears contradicting religious symbols","prays to their god whenever they have a moment of free time","is always reading something","made a pact with a daemon as a child","is actually a magic bear that can talk","has a fay best friend","can see ghosts","were born blind but uses magic to see","is actually a changeling","belongs to another race and uses a magic ring to hide","tried for years to teach themselves magic with no available","can hear the thoughts of others","used magic to make themselves forget their old life","has a guardian angle","has trapped a natural spirit and uses its powers for their benefit","uses an illusion bracelet to look more attractive than they are","every night they have turbulent, bloody and cryptic visions","sees someone else in the mirror","understands animals","used a love potion on their current spouse/lover","carries out dark rituals in an attempt to give themselves power","is the result of a magical experiment","remembers a previous life","uses magic to rejuvenate themselves","has an eye in their belly button","Possessed by quirky demon"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_races.json":
/*!*********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_races.json ***!
  \*********************************************************/
/*! exports provided: races-common, races-uncommon, races-rare, races-all, races, default */
/***/ (function(module) {

module.exports = {"races-common":[5,6,7,11,15,16,17,18,27],"races-uncommon":[0,1,4,8,10,12,13,19,20,21,24,26,28,30,31],"races-rare":[2,3,9,14,22,23,25,29],"races-all":["Aarakocra","Aasimar","Protector Aasimar","Sourge Aasimar","Fallen Aasimar","Beholder","Bugbear","Changeling","Dragonborn","Black Dragonborn","Blue Dragonborn","Red Dragonborn","Green Dragonborn","White Dragonborn","Brass Dragonborn","Bronze Dragonborn","Copper Dragonborn","Gold Dragonborn","Silver Dragonborn","Dwarf","Hill Dwarf","Mountain Dwarf","Duergar","Elf","Dark Elf","Eladrin","High Elf","Wood Elf","Firbolg","Genasi","Air Genasi","Earth Genasi","Fire Genasi","Water Genasi","Gnoll","Gnome","Deep Gnome","Forest Gnome","Rock Gnome","Goblin","Greenskin Goblin (Traditional Goblin)","Boggart Gnome","Gremlin Goblin","Goliath","Hag","Halfling","Lightfoot Halfling","Stout Halfling","Ghostwise Halfling","Half-Elf","Half Wood Elf","Half Moon Elf","Half Sun Elf","Half Drow","Half Aquatic Elf","Half-Orc","Human","Human Variant","Kenku","Kobold","Lizardfolk","Illithid","Minotaur","Silent Beast Minotaur","Baphomet Exile Minotaur","Orc","Gray Orc (Mountain Orc)","Common Orc","Orog Orc","Water Orc","Shardmind","Tabaxi","Tiefling","Triton","Warforged","Wilden","Yuan-Ti"],"races":[{"name":"Aarakocra","size":"M","speed":"25","speed-fly":"50","languages":["Common","Aarakocra"],"asi":[0,2,0,0,1,0],"extras":["Talons"],"source":"ELM","names":{"simple":["Khug","Yerc","Ra","Qharrk","Zus","Ekaass","Yirras","Suqeg","Gruaqik","Haiarrick","Qhed","Cluied","Khas","Sek","Kehk","Ucees","Klakkir","Grilass","Craelass","Grucierr","Hahk","Ooc","Khuf","Qe","Rhuqag","Callek","Ucaar","Rikiaf","Geecia"]}},{"name":"Aasimar","size":"M","speed":"30","speed-fly":"50","languages":["Common","Celestial"],"asi":[0,0,0,0,1,2],"extras":["Darkvision","Celestial Resistance","Healing Hands","Light Bearer"],"source":"VGM","subraces":[{"name":"Protector Aasimar","asi":[0,0,0,0,1,0],"extras":["Radiant Soul"],"source":"VGM"},{"name":"Scourge Aasimar","asi":[0,0,1,0,0,0],"extras":["Radiant Consumption"],"source":"VGM"},{"name":"Fallen Aasimar","asi":[1,0,0,0,0,0],"extras":["Necrotic Shroud"],"source":"VGM"}],"names":{"male":["Aritian","Beltin","Cernan","Cronwier","Eran","Ilamin","Maudril","Okrin","Parant","Tural","Wyran","Zaigan","Huggol","Brolrir","Velrim","Edun","Vykral","Tygwint","Rolrivin","Todetam","Zolriteel","Wogwodint"],"female":["Arken","Arsinoe","Davina","Drinma","Imesah","Masozi","Nijena","Niramour","Ondrea","Rhialla","Valtyra","Zole","Demmo","Meali","Homi","Thalve","Drinlie","Darsoni","Ravele","Limesa","Zordasa"]}},{"name":"Beholder","size":"L","speed":"5","speed-fly":"20","languages":["Common"],"asi":[0,1,2,2,1,1],"extras":["Eye Rays","All-around Vision","Antimagic Cone","Darkvision 60ft","Flight"],"source":"MM","names":{"simple":["Chihn","Elk","Khaalbralm","Zigaln","Oalxohs","Gatrucs","Khaotoskix","Midhyxis","Dhethacaksh","Xalbryrxioqa","Gi","Dhoax","Dhirthu","Olxaks","Lougthilx","Xadaks","Mirnoqehm","Qilbryqell","Thirdarelks","Zaudthroscakae","Je","Vaaph","Bagtharv","Qhezi","Dhoghuln","Zazducsh","Zimnuqielx","Rolbursahn","Chinaqsier","Dhamdraksiaqsa"]}},{"name":"Bugbear","size":"M","speed":"30","languages":["Common"],"asi":[2,1,0,0,0,0],"extras":["Long Limbed","Powerful Build","Sneaky","Surprise Attack"],"source":"MM","names":{"male":["Duuven","Grandaran","Turgur","Areban","Turban","Noovera","Nuopen","Uovamin","Estenim","Kiata","Noomi","Sinana","Karrus"],"female":["Uovatrin","Hineres","Nuosia","Kuola","Testred","Nuokea","Uovara","Neodra","Entidra","Tiatra","Tinavena","Tinalin","Noolin","Teeru","Hinlen","Aretra","Kiatrin"],"last":["Thickfoot","Fearlesspelt","Stoutpaw","Thunderspeaker","Boldslash","Rockbody"]}},{"name":"Changeling","size":"M","speed":"35","languages":["Common"],"asi":[0,1,0,0,0,2],"extras":["Duplicity","Shapechanger","Polyglot","Darkvision 60ft","Read Thoughts","Slippery Mind","Manipulator"],"source":"D&DWiki","names":{"simple":["Bouz","Saks","Ukt","Vok","Dorx","Loz","Saert","Fikt","Jas","Pum","Waeks","Iks","Urt","Ik","Ats","Roks","Mikt","Loom","Sat","Ruz","Feem","Mog","Uc","Vaiks","Ok","Ukt","Eeg","Bag","Wots","Rurs"]}},{"name":"Dragonborn","size":"M","speed":"30","languages":["Common","Draconic"],"asi":[2,0,0,0,0,1],"extras":["Breath Weapon","Damage Resistance"],"source":"PHB","subraces":[{"name":"Black Dragonborn"},{"name":"Blue Dragonborn"},{"name":"Red Dragonborn"},{"name":"Green Dragonborn"},{"name":"White Dragonborn"},{"name":"Brass Dragonborn"},{"name":"Bronze Dragonborn"},{"name":"Copper Dragonborn"},{"name":"Gold Dragonborn"},{"name":"Silver Dragonborn"}],"names":{"male":["Andujar","Armagan","Armek","Arzan","Axaran","Belaxarim","Brevarr","Djemidor","Draxan","Fayal","Grax","Iojad","Inzul","Khiraj","Kreytzen","Lejek","Mar","Nazir","Nedam","Nevek","Ravaran","Razaan","Sarax","Sarram","Savaxis","Siangar","Sirizan","Sunan","Szuran","Tajan","Tamajon","Tenahn","Toxal","Tzegyr","Vantajar","Vharkus","Xafiq","Zarkhil"],"female":["Artana","Kalas","Khagra","Leytra","Myrka","Naya","Sarcha","Shirren","Sirivistra","Sufana","Tamara","Vrumadi","Zovra"],"last":["Drencishkmiruth","Taxokmileas","Klulrishtad","Klethtundremesh","Ephikmuar","Empitallas","Erdexar","Larnashkmiash","Pruxakis","Taphir","Kraltuuc","Shambexin","Filtexik","Arnen","Linxal","Yialdrel"]}},{"name":"Dwarf","size":"M","speed":"25","languages":["Common","Dwarf"],"asi":[0,0,2,0,0,0],"extras":["Darkvision","Dwarven Resistance","Dwarven Combat Training","Tool Proficiency","Stone-Cunning"],"source":"PHB","subraces":[{"name":"Hill Dwarf","asi":[0,0,0,1,0,0],"extras":["Dwarven Toughness"]},{"name":"Mountain Dwarf","asi":[2,0,0,0,0,0],"extras":["Dwarven Armour Training"]},{"name":"Duergar","languages":["Undercommon"],"asi":[1,0,0,0,0,0],"extras":["Superior Darkvision","Duergar Resilience","Duergar Magic","Sunlight Sensitivity"],"source":"SCAG"}],"names":{"male":["Agaro","Arnan","Auxlan","Avamir","Baelnar","Balfam","Bariken","Borkul","Darkul","Dolmen","Dyrnar","Erag","Ezegan","Ferrek","Garmul","Glint","Ghorvas","Grimmalk","Haeltar","Halagmar","Halzar","Hlant","Korlag","Krag","Krim","Kurman","Lurtrum","Malagar","Mardam","Maulnar","Melgar","Morak","Orobok","Rogath","Roken","Rozag","Sabakzar","Sharak","Smethykk","Swargar","Thorbalt","Thorin","Tredigar","Vabul","Vistrum","Wolvar"],"female":["Beyla","Fenryl","Grenenzel","Krystolari","Lokara","Lurka","Marnia","Praxana","Rokel","Roksana","Thurlfara","Vauldra","Veklani","Vronwe","Zebel"],"last":["Ambershard","Barrelhelm","Copperhearth","Deepmiddens","Drakantal","Evermead","Garkalan","Grimtor","Hackshield","Irongull","Markolak","Ramcrown","Rockharvest","Silvertarn","Skandalor","Zarkanan","Strongmaster","Brightmaker","Minebreaker","Earthdelver","Brightmaster","Forgemaul","Bonegrip","Forgegrog","Brickbrow","Frostmail","Metalbreaker","Sapphirebraids","Magmabrew","Hammermail","Underfury","Kegshaper","Mountainriver","Merrybringer","Goldback","Drakegut","Steelback","Wraithmail","Noblebringer","Reddigger","Wyvernflayer","Hardhelm","Bottlehelm","Smeltmaster","Coalgrog","Thunderhead","Lavashield","Bittershaper","Thunderdelver","Largegut","Whitestone","Hardcloak","Rubyminer","Frosthand","Pebbleback","Blackbender","Flintmace","Shadowhand","Mudbelt","Flintgranite","Graybelt","Barrelchin","Bronzehide","Bloodgrip","Bluntchin","Brightbeard"]}},{"name":"Elf","size":"M","speed":"30","languages":["Common","Elvish"],"asi":[0,2,0,0,0,0],"extras":["Darkvision","Keen Senses","Fey Ancestry","Trance"],"source":"PHB","subraces":[{"name":"Dark Elf","languages":["Drow Hand Signs"],"asi":[0,0,0,0,0,1],"extras":["Superior Darkvision","Sunlight Sensitivity","Drow Magic","Drow Weapons Training"]},{"name":"Eladrin","asi":[0,0,0,1,0,0],"extras":["Elf Weapon Training","Fey Step"],"source":"DMG"},{"name":"High Elf","asi":[0,0,0,1,0,0],"extras":["Elf Weapon Training","+1 Cantrip"]},{"name":"Wood Elf","speed":"5","asi":[0,0,0,0,1,0],"extras":["Elf Weapon Training","Mask of the Wild"]}],"names":{"male":["Alarcion","Alathar","Ariandar","Arromar","Borel","Bvachan","Carydion","Elgoth","Farlien","Ferel","Gaerlan","Iafalior","Kaelthorn","Laethan","Leliar","Leodor","Lorak","Lorifir","Morian","Oleran","Rylef","Savian","Seylas","Tevior","Veyas","Iankian","Fardan","Genlar","Heryarus","Trajeon","Varis","Roric","Lumenor","Ralokas","Beilamin","Erfir","Traxidor","Wrantoris","Aehice","Yinlar","Fenbalar","Kelbalar","Daequinal","Leomaris","Umebalar","Leojor","Iliwarin","Glynjor","Dornan","Elaric","Valar","Oloren","Elakian","Herkian","Carmyar"],"female":["Aryllan","Atalya","Ayrthwil","Irva","Lyfalia","Ronefel","Thirya","Velene","Venefiq","Zereni","Zinrel","Bisys","Venkrana","Ravarora","Zinlynn","Zyldove","Zinthana","Keygwyn","Eilgella","Biqirelle","Ularoris","Gilvaris","Aralee","Valgella","Entris","Chaesys","Yllatris","Preslana","Liakrana","Xyrtris","Inamys","Trismys","Magfiel","Adjyre","Chaestina","Yllaxina","Wysamys","Holavaris","Liadi","Trisralei","Helerie","Jozana","Eillana","Neriwynn","Bryharice","Faxisys","Caisatra","Phina","Falana","Phibanise"],"last":["Autumnloft","Balefrost","Briarfell","Evenwind","Graytrails","Mooncairn","Riverwall","Stormwolf","Summergale","Sunshadow","Woodenhawk"]}},{"name":"Firbolg","size":"M","speed":"30","languages":["Common","Elvish","Giant"],"asi":[1,0,0,0,2,0],"extras":["Firbolg Magic","Hidden Step","Powerful Build","Speech of Beast and Leaf"],"source":"ELM","names":{"male":["Carren","Wranmaris","Wranhorn","Erzumin","Erbalar","Traris","Luwarin","Qidan","Yelquinal","Yelsalor","Pavalur","Urilar","Crajeon","Virran","Daejor","Yindan","Carpetor","Elafaren","Zinberos","Kelvalur","Cratoris","Olowarin","Uriren","Adric","Farjeon","Virvalur","Norsandoral","Daeneiros","Genxalim","Miraxidor"],"female":["Enjyre","Olagella","Brysys","Miajyre","Iarynore","Arana","Caivyre","Ravarie","Miasatra","Inahana","Yllagwyn","Eillana","Lialeth","Eilvaris","Bifina","Urileth","Zinfina","Keynala","Zylrieth","Yllajyre","Heleqirelle","Xyrgwyn","Helekalyn","Valphine","Bryrona","Valkrana","Sylna","Chaedove","Helebella","Shaphine"]}},{"name":"Genasi","size":"M","speed":"30","languages":["Common","Primordial"],"asi":[0,0,2,0,0,0],"source":"ELM","subraces":[{"name":"Air Genasi","asi":[0,1,0,0,0,0],"extras":["Unending Breath","Mingle with the Wind"]},{"name":"Earth Genasi","asi":[1,0,0,0,0,0],"extras":["Earth Walk","Merge with Stone"]},{"name":"Fire Genasi","asi":[0,0,0,1,0,0],"extras":["Darkvision","Fire Resistance","Reach to the Blaze"]},{"name":"Water Genasi","asi":[0,0,0,0,1,0],"extras":["Acid Resistance","Amphibious","Call to the Wave"]}],"names":{"simple":["Glint","Bonfire","Char","Gush","Downpour","Estuary","Gem","Crystal","Callous","Wheeze","Current","Azure","Flash","Ash","Gleam","Aqua","Brook","Sea","Turf","Sturdy","Basalt","Flutter","Tumult","Whistle","Fuego","Charcoal","Phoenix","Ocean","Aqua","Drizzle","Solid","Jewel","Sturdy","Surge","Gust","Cyclone","Nether","Fever","Glare","Surf","Mist","Lakelet","Sediment","Jewel","Sapphire","Turbulence","Soar","Whiff","Coal","Torrid","Cinder","Tempest","Tidal","Tsunami","Terra","Dense","Grime","Blast","Empyrean","Ascend","Ardor","Scoria","Cauterize","Tide","Brine","Downpour","Mountain","Alabaster","Emerald","Fly","Gasp","Float"]}},{"name":"Gnoll","size":"M","speed":"30","languages":["Common","Abyssal"],"asi":[2,1,0,0,0,0],"extras":["Darkvision","Bite","Rampage","Carrion Eater","Pack Tactics"],"source":"D&DWiki","names":{"male":["Ignar","Usmakh","Orbok","Ognab","Eterk","Eltakh","Iyalk","Unrerk","Irrut"],"female":["Ethab","Anduk","Udrud","Imdat","Esmam","Agnut","Umnol"],"last":["of the Grunting Fields","of the Retched Miscreations","of the Growling Savages","of the Gloating Slayers","of the Ravaging Wildlings","of the Rotted Killers","of the Bloody Vandals","of the Barren Brawlers","of the Roaming Wanderers","of the Feeding Hoodlums","of the Twitching Brawlers","of the Grunting Slayers","of the Forsaken Trappers"]}},{"name":"Gnome","size":"S","speed":"25","languages":["Common","Gnomish"],"asi":[0,0,0,2,0,0],"extras":["Darkvision","Gnome Cunning"],"source":"PHB","subraces":[{"name":"Deep Gnome","languages":["Undercommon"],"asi":[0,1,0,0,0,0],"extras":["Superior Darkvision","Stone Camoflague","Svirfneblin Magic"],"source":"D&DWiki"},{"name":"Forest Gnome","asi":[0,1,0,0,0,0],"extras":["Minor Illusion Cantrip","Speak with Small Beasts"],"source":"PHB"},{"name":"Rock Gnome","asi":[0,0,1,0,0,0],"extras":["Artificer's Lore","Tinker"],"source":"PHB"}],"names":{"male":["Cordri","Quator","Towor","Kasben","Corxim","Erlen","Urixim","Davmin","Enihim","Aripip","Tanfiz","Umxif","Nesmin","Salfan","Umros","Pokur","Alziver","Jegrim","Niwor","Manyur","Rasrick","Nesvyn","Aripip","Umnan","Nicryn","Jetor","Wremorn","Jorben","Vorpip","Corzu","Oruben","Orudri","Toyur","Sindon","Salfiz","Tanston","Corjin","Bilkur","Hisdon","Xofiz"],"female":["Krimyra","Spiqys","Banbi","Jelkasys","Yobys","Trimyra","Ufegani","Ylomiphi","Hesqaryn","Isolin","Nidysa","Inaxis","Faekasys","Mypine","Ufela","Zinfi","Qirhana","Remyn","Klowyn","Spidira","Venbys","Lildysa","Sassa","Carfi","Klowyn","Aluyore","Saza","Tifaroe","Daphili","Faesys"]}},{"name":"Goblin","size":"S","speed":"25","languages":["Common","Goblin"],"asi":[0,1,0,0,0,1],"extras":["Nimble Escape","Darkvision 60ft"],"source":"D&DWiki","subraces":[{"name":"Greenskin Goblin (Traditional Goblin)","asi":[0,1,0,0,0,0],"extras":["Mudslinger","Worg Rider","Run For It"],"source":"D&DWiki"},{"name":"Boggart Gnome","asi":[0,0,0,0,1,0],"extras":["Boggart Weapon Proficiency","Swamp Immunity","Bog Swimmer"],"source":"D&DWiki"},{"name":"Gremlin Goblin","asi":[0,0,0,1,0,0],"extras":["Dangerous Tinker","Almost Fire Proof","Tinkerer"],"source":"D&DWiki"}],"names":{"male":["Beets","Fil","Trelb","Strolx","Juld","Wromozz","Joihit","Pryhigs","Xakkur","Xiomteasb","Piong","Streld","Blear","Chegs","Usb","Zrabkiox","Hiameabs","Pliaddaakz","Wenur","Steahkiag","Vyng","Woibs","Prurx","Drokt","Freenk","Triokeq","Ohduiz","Heakniek","Girmulb","Laalgield"],"female":["Wesh","Phifzia","Weq","Quq","Wiqia","Enziaszea","Eelvusxia","Vravlilda","Eesvossai","Flitnuf","Shaqia","Ahx","Eelx","Crifee","Thong","Ollef","Ganeelk","Lukeeftai","Upraafz","Criokleef","Gnezia","Claarx","Trah","Brurx","Bragse","Ugtuisz","Khahbultea","Glarkuh","Uvieng","Shubahx"]}},{"name":"Goliath","size":"M","speed":"30","languages":["Common","Giant"],"asi":[2,0,1,0,0,0],"extras":["Natural Athlete","Stone's Endruance","Powerful Build","Mountain Born"],"source":"PHB","names":{"male":["Puglath","Augmith","Pathi","Apaphak","Vithak","Thagath","Vivhik","Iliglath","Geamahk","Vapath","Navhal","Mogak","Khugith","Vokin","Aupath","Vimahl","Movek","Vonoth","Thavagath","Geapath","Neovhal","Aukhal","Laman","Vaulath"],"female":["Oneni","Kinia","Kini","Paagia","Vulea","Velo","Pekeo","Thevia","Thukeo","Inanu","Onegea","Nalki","Penu","Genia","Genu","Kuomi","Guari","Nalea","Maapu","Nania","Vauki","Nalgeo","Kaumia","Vevu","Agevia","Kaukeo"],"last":["Truebearer","Mindrunner","Rocklander","Wildleaper","HonestJumper","Lumberbearer","Foodleader","Rockfist","Frightlander","Adeptguard","Goathand","Hidetanner","Foodfriend","Hardsmasher","Dawnguard","Wildcook","Mindworker","Rantanner","Wanderbreaker","Threadwarrior","Hornwalker","Bearpicker","Truejumper","Stormwatcher","Daysmasher","Dawndreamer","Strongaid","Strongpicker"]}},{"name":"Hag","size":"M","speed":"30","languages":["Common","Draconic","Sylvan"],"asi":[2,0,1,0,0,0],"extras":["Claws","Illusory Appearance","Invisible Passage","Amphibious","Mimicry"],"source":"HB","names":{"male":["Antsy Flora","Erratic Lila","Crooked Melissa","Lone Kim","Pesky Maggie","Salty Rosemarie","Frantic Shelley","Batty Emma","Jolly Pearl","Greedy Ramona"],"female":["Lurking Faye","Volatile Claudia","Antique Janis","Knotty Gayle","Wicked Pat","Whistling Olga","Dismal Roberta","Laughing Yvette","Bumpy Beatrice","Bickering Ina"],"last":["Saltscrambler","Soilcough","Fleshfeet","Branchjoint","Mirewiggle","Gristlecheeks","Snailbone","Coldbog","Inkstealer","Gravewart","Gnatbreath","Snailcounter","Mousemumbler","Critterknee","Gunktooth","Spotjoints","Meatrumbler","Woodwiggle","Pestmouth","Firecobble"]}},{"name":"Halfling","size":"S","speed":"25","languages":["Common","Halfling"],"asi":[0,2,0,0,0,0],"extras":["Lucky","Brave","Halfling Nimbleness"],"source":"PHB","subraces":[{"name":"Lightfoot Halfling","asi":[0,0,0,0,0,1],"extras":["Naturally Stealthy"],"source":"PHB"},{"name":"Stout Halfling","asi":[0,0,1,0,0,0],"extras":["Stout Resilience"],"source":"PHB"},{"name":"Ghostwise Halfling","languages":["Silent Speech"],"asi":[0,0,0,0,1,0],"source":"SCAG"}],"names":{"male":["Arthan","Carvin","Corby","Cullen","Egen","Ernest","Gedi","Heron","Jeryl","Keffen","Kylem","Kynt","Leskyn","Neff","Orne","Quarrel","Rabbit","Rilkin","Snakebait","Tarfen","Titch","Tuck","Whim"],"female":["Caliope","Emily","Piper","Rixi","Sabretha","Teg","Tilly","Toira","Vexia","Vil","Vzani","Zanthe","Ziza"],"last":["Angler","Battlestone","Blackwater","Daggersharp","Deepstrider","Hollowpot","Puddle","Raftmite","Skiprock","Silverfin","Tanglestrand","Tricker","Willowrush","Yellowcrane"]}},{"name":"Half-Elf","size":"M","speed":"30","languages":["Common","Elvish"],"asi":[0,0,0,0,0,2],"extras":["+1 ASI","+1 ASI","Darkvision","Fey Ancestry","Skill Versatility"],"source":"PHB","subraces":[{"name":"Half-Elf"},{"name":"Half Wood Elf","extras":["-Skill Versatility","Elf Weapon Training OR Fleet of Foot OR Mask of the Wild"],"source":"SCAG"},{"name":"Half Moon Elf","extras":["-Skill Versatility","Elf Weapon Training OR +1 Cantrip"],"source":"SCAG"},{"name":"Half Sun Elf","extras":["-Skill Versatility","Elf Weapon Training OR +1 Cantrip"],"source":"SCAG"},{"name":"Half Drow","extras":["-Skill Versatility","Drow Magic"],"source":"SCAG"},{"name":"Half Aquatic Elf","extras":["Fast Swimmer 30ft"],"source":"SCAG"}],"names":{"male":["Kevcraes","Ulril","Davstaer","Nilgretor","Leoavor","Sylvoril","Yorphanis","Maryeras","Nilgotin","Ianfaerd","Zanqarim","Ilolumin","Nilminar","Jamwarith","Oshorn","Fallanann","Xavyeras","Sarorin","Alzaren","Quoynor","Rilumin","Pannan","Corfaelor","Alyeras","Nilparin","Eirynor","Ianvalor","Kriril","Vannan","Zylzaphir"],"female":["Carnoa","Relona","Jilnys","Marethana","Unahophe","Prielor","Ophienyphe","Giffine","Alygalyn","Zelvyre","Cofaen","Unabellis","Quetihne","Halywaris","Phayestine","Venmalis","Kysyaries","Tylbwynn","Kyszira","Marewalyn","Dellynn","Zinzenya","Elimythe","Zincerys","Safviel","Aluqarin","Kysphira","Lorawaris","Qibellis","Byngwynn"]}},{"name":"Half-Orc","size":"M","speed":"30","languages":["Common","Orc"],"asi":[2,0,1,0,0,0],"extras":["Darkvision","Menacing","Relentless Endurance","Savage Attacks"],"source":"PHB","names":{"male":["Galurall","Kraurak","Bragul","Suzall","Kelanur","Gromorall","Zoradash","Narak","Korigash","Dorodark","Kamun","Mageruk","Reked","Urtrurim","Atrisk","Zaad","Gromozall","Brakedar","Urthazar","Thedak","Sadark","Nomar","Drarall","Malubark","Mugesk","Zaramak","Grimotur","Urtramak","Trakemur","Crebar"],"female":["Folener","Kurigu","Umigur","Fuloni","Felozara","Rashitah","Feleni","Shayogume","Natur","Rohesha","Kutinur","Mozi","Shodar","Sanati","Ubag","Folig","Olizira","Ekiki","Lagetar","Gresh","Lagaki","Tumeki","Gajeshi","Temizar","Gryone","Meroni","Shone","Grozura","Samene","Kerotir"]}},{"name":"Human","size":"M","speed":"30","languages":["Common","+1 Language"],"asi":[1,1,1,1,1,1],"source":"PHB","subraces":[{"name":"Human"},{"name":"Human Variant","asi":[-1,-1,-1,-1,-1,-1],"extras":["+1 ASI","+1 ASI","+1 Skill","+1 Feat"],"source":"PHB"}],"names":{"male":["Anlow","Arando","Bram","Cale","Dalkon","Daylen","Dodd","Dungarth","Dyrk","Eandro","Falken","Feck","Fenton","Gryphero","Hagar","Jeras","Krynt","Lavant","Leyten","Madian","Malfier","Markus","Meklan","Namen","Navaren","Nerle","Nilus","Ningyan","Norris","Quentin","Semil","Sevenson","Steveren","Talfen","Tamond","Taran","Tavon","Tegan","Vanan","Vincent"],"female":["Azura","Brey","Hallan","Kasaki","Lorelei","Mirabel","Pharana","Remora","Rosalyn","Sachil","Saidi","Tanika","Tura","Tylsa","Vencia","Xandrilla"],"last":["Arkalis","Armanci","Bilger","Blackstrand","Brightwater","Carnavon","Caskajaro","Coldshore","Coyle","Cresthill","Cuttlescar","Daargen","Dalicarlia","Danamark","Donoghan","Drumwind","Dunhall","Ereghast","Falck","Fallenbridge","Faringray","Fletcher","Fryft","Goldrudder","Grantham","Graylock","Gullscream","Hindergrass","Iscalon","Kreel","Kroft","Lamoth","Leerstrom","Lynchfield","Moonridge","Netheridge","Oakenheart","Pyncion","Ratley","Redraven","Revenmar","Roxley","Sell","Seratolva","Shanks","Shattermast","Shaulfer","Silvergraft","Stavenger","Stormchapel","Strong","Swiller","Talandro ","Targana","Towerfall","Umbermoor","Van Devries","Van Gandt","Van Hyden","Varcona","Varzand","Voortham","Vrye","Webb","Welfer","Wilxes","Wintermere","Wygarthe","Zatchet","Zethergyll"]}},{"name":"Kenku","size":"M","speed":"30","languages":["Common","Auran"],"asi":[0,2,0,0,1,0],"extras":["Expert Forgery","Kenku Training","Mimicry"],"source":"VGM","names":{"male":["Baker","Cutter","Stamper","Knocker","Screamer","Swan Honk","Goat Baa","Brush Stroke","Net Cast","Leather Flick","Puffer","Exploder","Striker","Carver","Crocodile Roar","Owl Rustle","Deer Clash","Bell Ring","Book Drop","Saw Drop"],"female":["Driller","Growler","Dragger","Walloper","Horse Whinny","Eagle Screech","Deer Rustle","Furnace Door","Rope Whip","Hatchet Drop","Scribbler","Forger","Nailer","Clipper","Jackal Laugh","Wolf Howl","Owl Swoop","Hatchet Chop","Cork Pop","Wood Crack"]}},{"name":"Kobold","size":"S","speed":"30","languages":["Common","Draconic"],"asi":[0,1,0,0,0,1],"extras":["Party Tactics","Sunlight Sensitivity","Darkvision 60ft","Trapper","Gutless","Hoarder","Kobold Weapon Training"],"source":"D&DWiki","names":{"simple":["Gan","Dog","Mett","Red","Tokru","Habi","Ritlo","Dere","Geki","Zavli","Tud","Des","Rev","Rigs","Snorto","Murku","Solge","Holta","Degle","Zikde","Snik","Tom","Hak","Snus","Snoka","Tagge","Takbe","Vahro","Herke","Gekbu","Zern","Nirn","Vatt","Nos","Tekbe","Tublo","Ivla","Kupli","Totre","Kekli","Gum","Norn","Hutt","Varn","Voka","Korka","Horke","Mila","Vota","Tedre"]}},{"name":"Lizardfolk","size":"M","speed":"30","speed-swim":"30","languages":["Common","Draconic"],"asi":[0,0,2,0,1,0],"extras":["Bite","Cunning Artisan","Hold Breath","Hunter's Lore","Natural Armor","Hungry Jaws"],"source":"VGM","names":{"male":["Trend","Turth","Vorhty","Uthroth","Shoggu","Ballass","Rashaesk","Thrortessix","Ditraekret","Irthaererk","Oth","Gurd","Dartarth","Kellux","Seda","Idri","Jhishak","Trirhtustrev","Truthrigrork","Maughaogra"],"female":["Lot","Ird","Jhirthiv","Kerirt","Idrat","Audreth","Irguv","Lothostrert","Kogrithon","Jhogregys","Kand","Lerd","Jherhtuth","Ullarth","Budrun","Olu","Irgia","Shaathognov","Laochogrut","Kerkikhesh"]}},{"name":"Illithid","size":"M","speed":"30","languages":["Deep Speech","Undercommon"],"asi":[0,0,0,2,0,1],"extras":["Darkvision 60ft","Lesser Magic Resistance","Mind Blast","Devour Brain","Aberrant Mind"],"source":"D&DWiki","names":{"simple":["Gassk","Zussk","Slellek","Gelbakt","Tusdul","Caoluk","Zengugalt","Lulluyux","Qengubum","Drengevelo","Kaks","Cul","Grezil","Kuglur","Tresir","Esdissk","Losginuam","Trurgelok","Riphalossk","Kobuyaungo","Tal","Gul","Svusbar","Enkum","Kasassk","Qagchussk","Vabromuss","Cugemoss","Vagruyult","Azungevu","Taks","Kaull","Svuldex","Thusder","Dranchur","Ergix","Cuddanuks","Gruabriyex","Cuzingakt","Vauzeguze"]}},{"name":"Minotaur","size":"M","speed":"30","languages":["Common","Abyssal"],"asi":[1,0,1,0,0,0],"extras":["Darkvision (60ft)","Gore","Charge","Labyrinthine Recall"],"source":"D&DWiki","subraces":[{"name":"Silent Beast Minotaur","asi":[0,0,0,0,1,0],"languages":["Giant"],"extras":["Self Mastery","Labyrinthine Tracking"]},{"name":"Baphomet Exile Minotaur","asi":[0,0,1,0,0,0],"extras":["Baphomet Origin","Siege Monster","Steady Feat"]}],"names":{"male":["Hesra","Aseme","Linekea","Gunbaran","Djunrat","Gungur","Nooparan","Hilala","Duulas","Heslin","Jarrus","Hunkar","Koornark","Koodaran"],"female":["Kikea","Kikane","Weonu","Linelas","Noonu","Loona","Neola","Sinaris","Kiru","Teelas","Seolas","Seesdra","Aretin","Uovavena"],"last":["Agilehorns","Stouthunter","Boldfighter","Thunderfighter","Heavyhunter","Bravehide","HonorBane","Keenhorn","Valiantheart","Swiftvigor","Jaggedhoof","Rockskin","Stonebane"]}},{"name":"Orc","size":"M","speed":"30","languages":["Common","Orcish"],"asi":[2,0,0,0,0,0],"extras":["Darkvision 60ft"],"source":"D&DWiki","subraces":[{"name":"Gray Orc (Mountain Orc)","asi":[0,0,0,0,1,0],"extras":["Cold Adapted","Natural Hunter","Mountain Tracker","Mountain Born","Sun Adapted"]},{"name":"Common Orc","asi":[0,0,1,0,0,0],"extras":["Aggressive","Battle Ready","Relentless Endurance","Savage Attacks"]},{"name":"Orog Orc","asi":[0,0,1,0,0,0],"extras":["powerful Build","Display of Strength","Superior Darkvision (120ft)","Battle Born"]},{"name":"Water Orc","asi":[0,2,0,0,0,0],"extras":["Water Born","Natural Water Hunter","Natural Fisher","Fire Weakness"]}],"names":{"male":["Zhag","Rhob","Mul","Ghol","Gradgar","Bruggon","Rhuddug","Jograkk","Dobzol","Zortab","Dhun","Dur","Shub","Abzod","Dogguk","Gurzuk","Bhuddok","Rhundun","Duhzud"],"female":["Shol","Dez","Bang","Bhyef","Bevrang","Nuwnuv","Bhomviv","Zumzum","Novneh","Ouwni","Guh","Hok","Hieng","Bev","Umul","Bevnam","Mewnkon","Imvol","Ivgu"],"last":["The Broken","The Broad","The Frantic","Brass Axe","Gnome Axe","The Grave","Tooth Axe","Giant Axe","The Crazy","The Grim","The Feisty","The Gargantuan"]}},{"name":"Shardmind","size":"M","speed":"30","languages":["Common","Shardspeak","+1 Language"],"asi":[0,0,0,2,1,0],"extras":["Crystalline Mind","Crystalline Body","Arcane Ancestry","Psionics"],"source":"D&DWiki","names":{"simple":["Balati","Aniniri","Balaraya","Erirashi","Irari","Sariram","Deluni","Ruanar","Delunaram","Tinwia","Tirulazu","Balanaru","Delushi","Eriram","Irayua","Tiruniri","Huaraya","Ashiwia","Bashari","Runyua","Runtari","Tinni","Luranu","Shirshi","Balatana","Tirumea","Balaram","Sarizu","Iluhara","Lupana"]}},{"name":"Tabaxi","size":"M","speed":"30","languages":["Common"],"asi":[0,2,0,0,1,0],"extras":["Exceptional Darkvision (100ft)","Feline Reflexes","Feline Ability"],"source":"D&DWiki","names":{"simple":["Wonder of the World","Coursing River","Dust on the Road","Snow of the Mountain","Paw of a Bear","Humble Leaf","Single Brain","Merry Spark","Austere Night","Brash Link","Taste of Fruit","Sleight Hand","Locket on a Heart","Flight of a Robin","Curious Needle","Amused Animal","Rare Flame","Silent Wave","Jade Ice","Unpulled Cart","Friend of Foe","Shadows in the Wind","Dream of Days","Drifting Snowflake","True Block","Prime Garden","Lost Beetle","Velvet Mark","Swift Brain"]}},{"name":"Tiefling","size":"M","speed":"30","languages":["Common","Infernal"],"asi":[0,0,0,1,0,2],"extras":["Darkvision","Hellish Resistance","Hellish Legacy"],"source":"PHB","names":{"male":["Ankhus","Arkadi","Armarius","Armillius","Archidius","Balmoloch","Calderax","Cavian","Cenereth","Chorum","Corynax","Dacian","Daelius","Damaceus","Decimeth","Demedor","Demerian","Dynachus","Grassus","Halius","Heleph","Incirion","Kalaradian","Kamien","Kazimir","Kzandro","Machem","Maetheus","Malfias","Marchion","Menerus","Namazeus","Nensis","Prismeus","Pyranikus","Razortail","Sejanus","Severian","Suffer","Syken","Tarkus","Vaius","Xerek","Zeth","Zevon"],"female":["Affyria","Cataclysmia","Domitia","Dorethau","Excellence","Hacari","Iritra","Lachira","Levatra","Mecretia","Milvia","Nericia","Precious","Rain","Samantia","Sunshine","Tenerife","Traya","Velavia","Zaidi","Zethaya"],"last":["Amarzian","Carnago","Domarien","Iscitan","Meluzan","Menetrian","Paradas","Romazi","Sarzan","Serechor","Shadowhorn","Szereban","Torzalan","Trelenus","Trevethor","Tryphon","Vadu","Vrago"]}},{"name":"Triton","size":"M","speed":"30","speed-swim":"30","languages":["Common","Primordial"],"asi":[1,0,1,0,0,1],"extras":["Amphibious","Control Air and Water","Emissary of the Sea","Guardians of the Depths"],"source":"VGM","names":{"male":["Dhavas","Vinvis","Denes","Khehnes","Devnes","Jhalnas","Mundus","Cohnos","Numus","Jilnis","Menles","Zivnis","Zedes","Kannas","Daglas","Murnus","Dilzis","Ruglus"],"female":["Esnen","Murlyn","Flaryn","Flethyn","Utryn","Wasnehyn","Yaslamen","Badreryn","Hinthelyn","Ethlyn","Whaslen","Unlen","Flatyn","Sumleden","Sirnenyn","Bhothluhyn"],"last":["Ragorsath","Rahramnath","Zuhrulath","Ahnomath","Juboxath","Dulodath","Dohlamath","Navodath","Ubollath","Obolvath","Ahnodath"]}},{"name":"Warforged","size":"M","speed":"30","languages":["Common","+1 Language"],"asi":[1,0,1,0,0,0],"extras":["Living Construct","Composite Plating"],"source":"D&DWiki","names":{"simple":["Driver","Calmer","Doctor","Cart","Teaser","Reviewer","Novice","Murderer","Awakener","Tempter","Coil","Bender","Two","Dagger","Patient","Gasher","Scrubber","Calmer","Fighter","Cleaver","Metal","Bulwark","Wielder","Sentry","Breaker","Nameless","Diagnoser","Designer","Bear","Drone"]}},{"name":"Wilden","size":"M","speed":"30","languages":["Common","Sylvan"],"asi":[0,1,0,0,2,0],"extras":["One with Nature","Wilderness Symbiosis"],"source":"HB","names":{"male":["Sankarran","Damrammas","Masfarran","Sintarrin","Rodgarron","Kettenmin","Marradrak","Barrunkas","Darrasnim","Torrimgar","Murlammir","Mandarras","Tumfarran","Mormorrin","Murmorrin","Karrendas","Fiddenbun","Vunnarlas","Zakkankas","Lorrinzor","Kordurrun","Sinmindin","Santorrin","Kanmennar","Masmorrin","Zakkanrak","Burrinnor","Kettenmar","Vunnargar","Mirrunzim"],"female":["Tirrennash","Ashinitas","Zellatish","Kersahai","Lorrissa","Tininash","Mirtenna","Wennishai","Lermeris","Gennentah","Trisitas","Erilarris","Kenninnem","Erilitas","Zazinnem","Ashinembin","Tazanai","Ennorren","Krinerla","Lorrembin","Tazembin","Kersarris","Zarerlis","Tirrimmesh","Ennonnes","Shanoris","Kersalin","Mirtinah","Ennerla","Wenneris"]}},{"name":"Yuan-Ti","size":"M","speed":"30","languages":["Common","Yuan Ti"],"asi":[0,0,0,1,0,2],"extras":["Speak with Serpents","Darkvision (60ft)","Poison Resilience","Passive Armor"],"source":"D&DWiki","names":{"simple":["Ehsha","Zeshu","Thoshu","Ssashill","Mozsiuh","Ssisia","Zaktlulliss","Shoszuihsa","Theksuzal","Yissatie","Zheka","Zezsuss","Haktluih","Alsu","Tistlu","Sseshu","Ssalehlal","Zsutzithi","Hashihsul","Hehluishus","Ssuksall","Oltsi","Suni","Ssami","Nohshu","Sshezhi","Ssoksuithash","Ssheshuzhi","Szishoahsuiss","Uleyi"]}}]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_relationships.json":
/*!*****************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_relationships.json ***!
  \*****************************************************************/
/*! exports provided: relationships, default */
/***/ (function(module) {

module.exports = {"relationships":["was betrayed once, won't let anyone get close to them anymore","not interested in relationships","single","single, and proud of it","single, and looking to date","single, still lives with parents","single, always out with a new date","single, just got out of a hard breakup","single, just dumped their lover","single, but casually dating multiple others at once","in a relationship","in a relationship, thinking of breaking up","in a relationship, paranoid they will break up","in a relationship with their {{relative}}, trying to keep it a secret","in a physically abusive relationship","seeing someone who is married","forced into a pre-arranged relationship","forced into a pre-arranged marriage","happily married, no children","happily married, just had their first child","happily married, with a single child","happily married, with several children","married, and having an affair","bitterly married, no children","bitterly married, just had their first child","bitterly married, considering divorce","bitterly married, with a single child","bitterly married, with several children","recently divorced","divorced for many years","divorced, and looking","divorced, and heartbroken","recently widowed, grieving","widowed many years ago","widowed, and looking","widowed, and heartbroken"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_relatives.json":
/*!*************************************************************!*\
  !*** ./resources/js/components/json/npc/npc_relatives.json ***!
  \*************************************************************/
/*! exports provided: relatives, default */
/***/ (function(module) {

module.exports = {"relatives":["brother","sister","mother","father","cousin","friend","best friend","son/daughter (if applicable)","uncle","aunt","step-mother or mother-in-law","step-father or father-in-law","step-brother or brother-in-law","step-sister or sister-in-law","brother's friend","sister's friend","best friend's brother","best friend's sister","best friend's mother","best friend's father","best friend's significant other"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_titles.json":
/*!**********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_titles.json ***!
  \**********************************************************/
/*! exports provided: titles, default */
/***/ (function(module) {

module.exports = {"titles":["The Boorish","The Braggart","The Coward","The Darkness","The Defender","The Defiant","The Dragonheart","The Eight-fingered","The Feared","The Fearful","The Fool","The Fire Warden","The Fire Watcher","The Half-hand","The Hand","The Heroic","The Honorable","The Illuminated","The Illustrious","The Inebriated","The Judged","The Juggler","The Killer","The Kind","The Mad","The Mystic","The Nine-fingered","The Plagued","The Reaver","The Redeemed","The Redeemer","The Renegade","The Runner","The Scared","The Scarred","The Scryer","The Seven-fingered","The Shadow","The Six-fingered","The Smiler","The Strong","The Sweet","The Swindler","The Thinker","The Weak","The Wise","The Wolfheart","Ghost-hands","Tuskbreaker","Smiles","Elvenheart","Rocksmasher","Hammerhand","One-Eye","One-Thumb","Twice-Dead","The Abandoned","The Able","The Absolute","The Adorable","The Adventurous","The Academic","The Acceptable","The Acclaimed","The Accomplished","The Accurate","The Aching","The Acidic","The Acrobatic","The Active","The Adept","The Admirable","The Admired","The Adolescent","The Adored","The Advanced","The Afraid","The Affectionate","The Aged","The Aggravating","The Aggressive","The Agile","The Agitated","The Agonizing","The Agreeable","The Alarmed","The Alarming","The Alert","The Alienated","The Alive","The Amazing","The Ambitious","The Ample","The Amused","The Amusing","The Anchored","The Ancient","The Angelic","The Angry","The Anguished","The Animated","The Annual","The Antique","The Anxious","The Apprehensive","The Appropriate","The Apt","The Arctic","The Arid","The Aromatic","The Artistic","The Ashamed","The Astonishing","The Athletic","The Attached","The Attentive","The Attractive","The Austere","The Authentic","The Average","The Aware","The Awesome","The Awful","The Awkward","The Babyish","The Bad","The Bare","The Barren","The Basic","The Beautiful","The Belated","The Beloved","The Beneficial","The Best","The Bewitched","The Big","The Big-Hearted","The Bite-Sized","The Bitter","The Black","The Black-And-White","The Bland","The Blank","The Bleak","The Blind","The Blissful","The Blond","The Blue","The Blushing","The Bogus","The Boiling","The Bold","The Bony","The Boring","The Bossy","The Bouncy","The Bountiful","The Bowed","The Brave","The Breakable","The Brief","The Bright","The Brilliant","The Brisk","The Broken","The Bronze","The Brown","The Bruised","The Bubbly","The Bulky","The Bumpy","The Buoyant","The Burdensome","The Burly","The Bustling","The Busy","The Buttery","The Buzzing","The Calculating","The Calm","The Candid","The Canine","The Capital","The Carefree","The Careful","The Careless","The Caring","The Cautious","The Cavernous","The Celebrated","The Charming","The Cheap","The Cheerful","The Cheery","The Chief","The Chilly","The Chubby","The Circular","The Classic","The Clean","The Clear","The Clear-Cut","The Clever","The Closed","The Cloudy","The Clueless","The Clumsy","The Cluttered","The Coarse","The Cold","The Colorful","The Colorless","The Colossal","The Comfortable","The Common","The Compassionate","The Competent","The Complete","The Complex","The Complicated","The Composed","The Concerned","The Confused","The Conscious","The Considerate","The Constant","The Content","The Conventional","The Cooked","The Cooperative","The Coordinated","The Corrupt","The Costly","The Courageous","The Courteous","The Crafty","The Crazy","The Creative","The Creepy","The Criminal","The Critical","The Crooked","The Crowded","The Cruel","The Crushing","The Cuddly","The Cultivated","The Cultured","The Cumbersome","The Curly","The Curvy","The Cute","The Damaged","The Damp","The Dangerous","The Dapper","The Daring","The Dark","The Dazzling","The Dead","The Deadly","The Deafening","The Dear","The Dearest","The Decent","The Decisive","The Deep","The Defenseless","The Defensive","The Deficient","The Definite","The Definitive","The Delayed","The Delectable","The Delicious","The Delightful","The Delirious","The Demanding","The Dense","The Dependable","The Dependent","The Descriptive","The Deserted","The Detailed","The Determined","The Devoted","The Different","The Difficult","The Diligent","The Dim","The Dimpled","The Dimwitted","The Direct","The Disastrous","The Discrete","The Disfigured","The Disgusting","The Disloyal","The Dismal","The Distant","The Dreary","The Dirty","The Disguised","The Dishonest","The Distinct","The Distorted","The Dizzy","The Dopey","The Doting","The Double","The Drab","The Drafty","The Dramatic","The Droopy","The Dry","The Dual","The Dull","The Dutiful","The Eager","The Earnest","The Early","The Easy","The Easy-Going","The Ecstatic","The Edible","The Educated","The Elaborate","The Elastic","The Elated","The Elderly","The Elegant","The Elementary","The Embarrassed","The Embellished","The Eminent","The Emotional","The Empty","The Enchanted","The Enchanting","The Energetic","The Enlightened","The Enormous","The Enraged","The Envious","The Equal","The Equatorial","The Essential","The Esteemed","The Ethical","The Euphoric","The Evergreen","The Everlasting","The Exalted","The Excellent","The Exemplary","The Exhausted","The Excitable","The Excited","The Exciting","The Exotic","The Expensive","The Experienced","The Expert","The Extraneous","The Extra-Large","The Extra-Small","The Fabulous","The Failing","The Faint","The Fair","The Faithful","The Fake","The False","The Familiar","The Famous","The Fancy","The Fantastic","The Far","The Far-Flung","The Far-Off","The Fast","The Fat","The Fatal","The Favorable","The Favorite","The Fearless","The Feisty","The Feline","The Feminine","The Few","The Fickle","The Filthy","The Fine","The Finished","The Firm","The First","The Fitting","The Fixed","The Flaky","The Flamboyant","The Flashy","The Flat","The Flawed","The Flawless","The Flickering","The Flimsy","The Flippant","The Flowery","The Fluffy","The Fluid","The Flustered","The Focused","The Fond","The Foolhardy","The Foolish","The Forceful","The Formal","The Forsaken","The Forthright","The Fortunate","The Fragrant","The Frail","The Frank","The Frayed","The Free","The Fresh","The Frequent","The Friendly","The Frightened","The Frightening","The Frigid","The Frilly","The Frivolous","The Frosty","The Frozen","The Frugal","The Fruitful","The Fumbling","The Functional","The Funny","The Fussy","The Fuzzy","The Gargantuan","The Gaseous","The General","The Generous","The Gentle","The Genuine","The Giant","The Giddy","The Gigantic","The Gifted","The Giving","The Glamorous","The Glaring","The Gleaming","The Gleeful","The Glistening","The Glittering","The Gloomy","The Glorious","The Glossy","The Golden","The Good","The Good-Natured","The Gorgeous","The Graceful","The Gracious","The Grand","The Grandiose","The Grateful","The Gray","The Great","The Greedy","The Green","The Gregarious","The Grim","The Gripping","The Grizzled","The Gross","The Grotesque","The Grouchy","The Grounded","The Growing","The Growling","The Grown","The Gruesome","The Grumpy","The Guilty","The Gullible","The Hairy","The Half","The Handy","The Happy","The Happy-Go-Lucky","The Hard","The Hard-To-Find","The Harmful","The Harmless","The Harmonious","The Harsh","The Hasty","The Hateful","The Haunting","The Healthy","The Heartfelt","The Hearty","The Heavenly","The Heavy","The Hefty","The Helpful","The Helpless","The Hidden","The Hideous","The High","The High-Level","The Hilarious","The Hoarse","The Hollow","The Homely","The Honest","The Honorable","The Honored","The Hopeful","The Horrible","The Hospitable","The Hot","The Huge","The Humble","The Humiliating","The Humming","The Humongous","The Hungry","The Hurtful","The Husky","The Icky","The Icy","The Ideal","The Idealistic","The Identical","The Idle","The Idiotic","The Idolized","The Ignorant","The Ill","The Illegal","The Ill-Fated","The Ill-Informed","The Illiterate","The Illustrious","The Imaginary","The Imaginative","The Immaculate","The Immense","The Impeccable","The Impartial","The Imperfect","The Impish","The Impolite","The Important","The Impossible","The Impractical","The Impressionable","The Impressive","The Improbable","The Impure","The Inborn","The Incomparable","The Incompatible","The Incomplete","The Inconsequential","The Incredible","The Indelible","The Inexperienced","The Indolent","The Infamous","The Infantile","The Infatuated","The Inferior","The Infinite","The Informal","The Innocent","The Insecure","The Insidious","The Insignificant","The Insistent","The Instructive","The Insubstantial","The Intelligent","The Intent","The Intentional","The Interesting","The Internal","The International","The Intrepid","The Ironclad","The Irresponsible","The Irritating","The Itchy","The Jaded","The Jagged","The Jam-Packed","The Jaunty","The Jealous","The Jittery","The Joint","The Jolly","The Jovial","The Joyful","The Joyous","The Jubilant","The Judicious","The Juicy","The Jumbo","The Junior","The Jumpy","The Juvenile","The Kaleidoscopic","The Keen","The Key","The Kind","The Kindhearted","The Kindly","The Klutzy","The Knobby","The Knotty","The Knowledgeable","The Knowing","The Known","The Kooky","The Kosher","The Lame","The Lanky","The Large","The Last","The Late","The Lavish","The Lawful","The Lazy","The Leading","The Lean","The Leafy","The Left","The Legitimate","The Light","The Lighthearted","The Likable","The Likely","The Limited","The Limp","The Limping","The Liquid","The Little","The Live","The Lively","The Livid","The Loathsome","The Lone","The Lonely","The Long","The Long-Term","The Loose","The Lopsided","The Lost","The Loud","The Lovable","The Lovely","The Loving","The Low","The Loyal","The Lucky","The Lumbering","The Luminous","The Lumpy","The Lustrous","The Luxurious","The Made-Up","The Magnificent","The Majestic","The Major","The Mammoth","The Married","The Marvelous","The Masculine","The Massive","The Mature","The Meager","The Mean","The Measly","The Meaty","The Mediocre","The Meek","The Mellow","The Melodic","The Memorable","The Menacing","The Merry","The Messy","The Mild","The Milky","The Mindless","The Miniature","The Minor","The Miserable","The Miserly","The Misguided","The Misty","The Mixed","The Modest","The Moist","The Monstrous","The Monumental","The Moral","The Mortified","The Motionless","The Mountainous","The Muddy","The Muffled","The Mundane","The Murky","The Mushy","The Musty","The Muted","The Mysterious","The Naive","The Narrow","The Nasty","The Natural","The Naughty","The Nautical","The Neat","The Necessary","The Needy","The Negative","The Neglected","The Negligible","The Nervous","The New","The Nice","The Nifty","The Nimble","The Nippy","The Nocturnal","The Noisy","The Nonstop","The Normal","The Notable","The Noted","The Noteworthy","The Novel","The Noxious","The Numb","The Nutty","The Obedient","The Obese","The Oily","The Obvious","The Odd","The Offbeat","The Offensive","The Official","The Old","The Old-Fashioned","The Open","The Optimal","The Optimistic","The Opulent","The Orange","The Orderly","The Organic","The Ornate","The Ornery","The Ordinary","The Original","The Outgoing","The Outlandish","The Outrageous","The Outstanding","The Overdue","The Overjoyed","The Overlooked","The Pale","The Parched","The Partial","The Passionate","The Peaceful","The Peppery","The Perfect","The Perfumed","The Perky","The Pesky","The Pessimistic","The Petty","The Phony","The Physical","The Piercing","The Pink","The Pitiful","The Plain","The Playful","The Pleasant","The Pleased","The Pleasing","The Plump","The Polished","The Polite","The Pointed","The Pointless","The Poised","The Poor","The Popular","The Portly","The Posh","The Positive","The Powerful","The Powerless","The Practical","The Precious","The Prestigious","The Pretty","The Pricey","The Prickly","The Primary","The Prime","The Pristine","The Private","The Probable","The Productive","The Profitable","The Proper","The Proud","The Prudent","The Punctual","The Pungent","The Puny","The Pure","The Purple","The Pushy","The Putrid","The Puzzled","The Puzzling","The Quaint","The Qualified","The Quarrelsome","The Quarterly","The Queasy","The Questionable","The Quick","The Quick-Witted","The Quiet","The Quirky","The Quixotic","The Quizzical","The Radiant","The Ragged","The Rapid","The Rare","The Raw","The Reckless","The Ready","The Realistic","The Reasonable","The Red","The Reflecting","The Regal","The Regular","The Reliable","The Relieved","The Remarkable","The Remorseful","The Remote","The Repentant","The Respectful","The Responsible","The Repulsive","The Rich","The Right","The Ringed","The Ripe","The Roasted","The Rosy","The Rotten","The Rough","The Round","The Rowdy","The Royal","The Rude","The Rusty","The Sad","The Safe","The Salty","The Sandy","The Sane","The Sarcastic","The Satisfied","The Scaly","The Scarce","The Scary","The Scented","The Scholarly","The Scornful","The Scratchy","The Scrawny","The Second","The Self-Assured","The Self-Reliant","The Selfish","The Serene","The Serious","The Serpentine","The Severe","The Shabby","The Shadowy","The Shady","The Shallow","The Shameful","The Shameless","The Sharp","The Shiny","The Shocked","The Shocking","The Shoddy","The Short","The Shrill","The Shy","The Sick","The Silent","The Silky","The Silly","The Simple","The Sinful","The Skinny","The Sleepy","The Slim","The Slimy","The Slippery","The Slow","The Small","The Smart","The Smooth","The Smug","The Snappy","The Sneaky","The Soft","The Soggy","The Somber","The Sophisticated","The Sorrowful","The Sour","The Sparkling","The Spectacular","The Speedy","The Spicy","The Spirited","The Spiteful","The Splendid","The Spotless","The Spotted","The Squeaky","The Stable","The Stained","The Stale","The Steep","The Sticky","The Stiff","The Stingy","The Stormy","The Straight","The Strange","The Strict","The Striking","The Strong","The Studious","The Stunning","The Stupendous","The Stupid","The Sturdy","The Stylish","The Submissive","The Subtle","The Sudden","The Sugary","The Super","The Superb","The Superficial","The Superior","The Supportive","The Sure-Footed","The Surprised","The Suspicious","The Sweaty","The Swift","The Sympathetic","The Tall","The Talkative","The Tame","The Tan","The Tart","The Tasty","The Tattered","The Tedious","The Tempting","The Tender","The Tense","The Terrible","The Terrific","The Testy","The Thankful","The Thick","The Thin","The Third","The Thirsty","The Thorny","The Thoughtful","The Thrifty","The Thunderous","The Tidy","The Tight","The Timely","The Tiny","The Tired","The Torn","The Tough","The Traumatic","The Treasured","The Tremendous","The Tragic","The Trained","The Tricky","The Trim","The Trivial","The Troubled","The True","The Trusting","The Trustworthy","The Trusty","The Truthful","The Tubby","The Twin","The Ugly","The Unacceptable","The Unaware","The Uncomfortable","The Uncommon","The Unconscious","The Unequaled","The Uneven","The Unfinished","The Unfit","The Unfortunate","The Unhappy","The Unhealthy","The Uniform","The Unimportant","The Unique","The Unknown","The Unlawful","The Unlucky","The Unnatural","The Unpleasant","The Unripe","The Unruly","The Unselfish","The Unsightly","The Unsteady","The Unsung","The Untidy","The Unusual","The Unwelcome","The Unwieldy","The Unwilling","The Unwitting","The Unwritten","The Upbeat","The Upright","The Upset","The Used","The Useful","The Useless","The Vacant","The Vague","The Vain","The Valuable","The Variable","The Vast","The Vengeful","The Vibrant","The Vicious","The Victorious","The Vigilant","The Vigorous","The Violet","The Violent","The Virtuous","The Visible","The Warm","The Warmhearted","The Wary","The Wasteful","The Watchful","The Wavy","The Wealthy","The Weary","The Webbed","The Weird","The Welcome","The Well-Groomed","The Well-Informed","The Well-Off","The Well-Worn","The Wet","The Whimsical","The Whirlwind","The Whispered","The White","The Wide","The Wild","The Willing","The Winged","The Witty","The Woeful","The Wonderful","The Wooden","The Wordy","The Worn","The Worried","The Worrisome","The Worst","The Worthless","The Worthwhile","The Worthy","The Wretched","The Wrong","The Yawning","The Yellow","The Young","The Youthful","The Zealous","The Zesty","The Aloof","The Arrogant","The Belligerent","The Big-Headed","The Cowardly","The Cunning","The Cynical","The Deceitful","The Finicky","The Impatient","The Impulsive","The Inconsiderate","The Inconsistent","The Interfering","The Intolerant","The Moody","The Narrow-Minded","The Obsessive","The Ruthless","The Stubborn","The Timid","The Touchy","The Thoughtless","The Unkind","The Unpredictable","The Unreliable","The Untrustworthy","The Vulgar"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_traits.json":
/*!**********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_traits.json ***!
  \**********************************************************/
/*! exports provided: traits, default */
/***/ (function(module) {

module.exports = {"traits":["is very quick to trust other people","is very slow to trust other people","is very stubborn","is very optimistic","is very pessimistic","is an example of modesty","is conceited","is very self-confident","has no self-confidence","rarely speaks","is very talkative","only talks in whispers","only talks loudly","is very generous","is very greedy","is materialistic","is non-materialistic","is very cowardly","is very courageous, to a fault","doesn't care about risks or odds","judges people by their actions, not their words","takes everything at face-value","is a perfectionist","is lazy","always has to be doing something","can't stand laziness","can't keep a secret","is very good at keeping secrets","acts on impulse","has an even temper","would rather act than talk or think","will ponder the pros and cons before making a decision","gets bored easily","has a highly variable mood","is bipolar","is always calm","is very patient","is very impatient","rarely thinks ahead","is always very calm","is always prepared","is always very excited","always has a backup plan","is very focused","is very cynical","is a hopeless romantic","uses sarcasm and insults commonly","always gets straight to the point","is very direct","changes subject very often","is always ironic","is very selfish","will always prioritize their needs above others'","will always prioritize the needs of other people, even to their detriment","shows very little empathy towards others","is very empathic towards others","is always ready to help others","is polite and respectful","is a pacifist","is kind and generous","easily holds grudges","is very benevolent","is prone to violence","is a very good diplomat and always works towards resolution of conflict","is very good at defusing tensions","often spies on other people","is always fair","hates fair play","constantly looks for a loophole"]};

/***/ }),

/***/ "./resources/js/components/json/npc/npc_voices.json":
/*!**********************************************************!*\
  !*** ./resources/js/components/json/npc/npc_voices.json ***!
  \**********************************************************/
/*! exports provided: voices, default */
/***/ (function(module) {

module.exports = {"voices":["Speaks in rhyme","High, shrill voice","Deep, booming voice","Speaks loudly, with little regard for others around","Hoarse voice, from a lifetime of inhaling smoke","Slurred speech","Has a lisp","Stutters","Enunciates overly clearly","Uses flowery speech","Uses high society vocabulary","Quick, nervous speech","Calming, soothing voice","Lots of \"um\"","Stuffy Nose","Emphasizes the wrong syllables","R's arrrrrre always rrrrrrrolled","Whistles on \"S\" sounds","\"R\" sounds become \"W\" sounds","\"Th\" sounds become \"Z\" sounds","\"L\" sounds become \"W\" sounds","Pauses frequently","Sighs after each sentence","Talks in third person","Barely opens mouth","Incoherent except for a few key words","Abrasive","Adenoidal","Airy","Animated","Anxious","Authoritative","Barely Audible","Baritone","Barking","Bass","Blasé","Bored","Boyish","Bitter","Bland","Bleak","Booming","Brash","Braying","Breathy","Breezy","Bubbly","Calm","Casual","Cheerful","Childish","Chirping","Cracked, Cracking","Crooning","Cultured","Cynical","Deep","Devoid Of Emotion","Discordant","Dreamy","Dull","Falsetto","Feeble","Firm","Fierce","Forceful","Gentle","Girlish","Glum","Goofy","Grating","Gravelly","Grim","Growling","Gruff","Guttural","Harsh","Hateful","Hesitant","High-pitched","Hissing","Hoarse","Hushed","Husky","Indifferent","Insinuating","Intense","Jubilant","Lazy","Lifeless","Lively","Loud","Low-pitched","Matter-of-fact","Melodious","Mocking","Monotonous","Muffled","Musical","Nasally","Nonchalant","Piercing","Quavering","Quiet","Ragged","Rasping","Refined","Roaring","Rough","Sarcastic","Scratchy","Screeching","Serene","Shaky","Shrill","Silly","Sincere","Singsong","Slurring","Smooth","Snide","Soft","Somber","Soothing","Soprano","Spaced-out","Strained","Suave","Suggestive","Squeaky","Squealing","Sympathetic","Teasing","Throaty","Thunderous","Tender","Tense","Trembling","Uncertain","Unsteady","Vague","Warm","Wavering","Weak","Weary","Wheezy","Whiny","Wistful"]};

/***/ }),

/***/ "./resources/js/components/npcs/My_Npcs.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/npcs/My_Npcs.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _My_Npcs_vue_vue_type_template_id_fecec65a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./My_Npcs.vue?vue&type=template&id=fecec65a& */ "./resources/js/components/npcs/My_Npcs.vue?vue&type=template&id=fecec65a&");
/* harmony import */ var _My_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./My_Npcs.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/My_Npcs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _My_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _My_Npcs_vue_vue_type_template_id_fecec65a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _My_Npcs_vue_vue_type_template_id_fecec65a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/My_Npcs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/My_Npcs.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/npcs/My_Npcs.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_My_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./My_Npcs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/My_Npcs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_My_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/My_Npcs.vue?vue&type=template&id=fecec65a&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/npcs/My_Npcs.vue?vue&type=template&id=fecec65a& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_My_Npcs_vue_vue_type_template_id_fecec65a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./My_Npcs.vue?vue&type=template&id=fecec65a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/My_Npcs.vue?vue&type=template&id=fecec65a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_My_Npcs_vue_vue_type_template_id_fecec65a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_My_Npcs_vue_vue_type_template_id_fecec65a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/npcs/NPC_GEN_DATA.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/npcs/NPC_GEN_DATA.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NPC_GEN_DATA_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPC_GEN_DATA.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/NPC_GEN_DATA.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _NPC_GEN_DATA_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/NPC_GEN_DATA.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/NPC_GEN_DATA.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/npcs/NPC_GEN_DATA.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NPC_GEN_DATA_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NPC_GEN_DATA.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/NPC_GEN_DATA.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NPC_GEN_DATA_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Npc_Public_Fullview.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_Public_Fullview.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Npc_Public_Fullview_vue_vue_type_template_id_528a913a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Npc_Public_Fullview.vue?vue&type=template&id=528a913a& */ "./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=template&id=528a913a&");
/* harmony import */ var _Npc_Public_Fullview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Npc_Public_Fullview.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Npc_Public_Fullview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Npc_Public_Fullview_vue_vue_type_template_id_528a913a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Npc_Public_Fullview_vue_vue_type_template_id_528a913a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/Npc_Public_Fullview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_Public_Fullview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_Public_Fullview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_Public_Fullview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=template&id=528a913a&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=template&id=528a913a& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_Public_Fullview_vue_vue_type_template_id_528a913a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_Public_Fullview.vue?vue&type=template&id=528a913a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_Public_Fullview.vue?vue&type=template&id=528a913a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_Public_Fullview_vue_vue_type_template_id_528a913a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_Public_Fullview_vue_vue_type_template_id_528a913a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/npcs/Npc_edit.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/npcs/Npc_edit.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Npc_edit_vue_vue_type_template_id_8e93e46c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Npc_edit.vue?vue&type=template&id=8e93e46c& */ "./resources/js/components/npcs/Npc_edit.vue?vue&type=template&id=8e93e46c&");
/* harmony import */ var _Npc_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Npc_edit.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/Npc_edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Npc_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Npc_edit_vue_vue_type_template_id_8e93e46c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Npc_edit_vue_vue_type_template_id_8e93e46c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/Npc_edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/Npc_edit.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_edit.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Npc_edit.vue?vue&type=template&id=8e93e46c&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_edit.vue?vue&type=template&id=8e93e46c& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_edit_vue_vue_type_template_id_8e93e46c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_edit.vue?vue&type=template&id=8e93e46c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_edit.vue?vue&type=template&id=8e93e46c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_edit_vue_vue_type_template_id_8e93e46c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_edit_vue_vue_type_template_id_8e93e46c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/npcs/Npc_generator.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/npcs/Npc_generator.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Npc_generator_vue_vue_type_template_id_0cdac2c3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Npc_generator.vue?vue&type=template&id=0cdac2c3& */ "./resources/js/components/npcs/Npc_generator.vue?vue&type=template&id=0cdac2c3&");
/* harmony import */ var _Npc_generator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Npc_generator.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/Npc_generator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Npc_generator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Npc_generator_vue_vue_type_template_id_0cdac2c3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Npc_generator_vue_vue_type_template_id_0cdac2c3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/Npc_generator.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/Npc_generator.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_generator.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_generator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_generator.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_generator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_generator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Npc_generator.vue?vue&type=template&id=0cdac2c3&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_generator.vue?vue&type=template&id=0cdac2c3& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_generator_vue_vue_type_template_id_0cdac2c3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_generator.vue?vue&type=template&id=0cdac2c3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_generator.vue?vue&type=template&id=0cdac2c3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_generator_vue_vue_type_template_id_0cdac2c3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_generator_vue_vue_type_template_id_0cdac2c3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/npcs/Npc_view.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/npcs/Npc_view.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Npc_view_vue_vue_type_template_id_beffd636___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Npc_view.vue?vue&type=template&id=beffd636& */ "./resources/js/components/npcs/Npc_view.vue?vue&type=template&id=beffd636&");
/* harmony import */ var _Npc_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Npc_view.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/Npc_view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Npc_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Npc_view_vue_vue_type_template_id_beffd636___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Npc_view_vue_vue_type_template_id_beffd636___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/Npc_view.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/Npc_view.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_view.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_view.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Npc_view.vue?vue&type=template&id=beffd636&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/npcs/Npc_view.vue?vue&type=template&id=beffd636& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_view_vue_vue_type_template_id_beffd636___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npc_view.vue?vue&type=template&id=beffd636& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npc_view.vue?vue&type=template&id=beffd636&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_view_vue_vue_type_template_id_beffd636___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npc_view_vue_vue_type_template_id_beffd636___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/npcs/Npcs.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/npcs/Npcs.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Npcs_vue_vue_type_template_id_463c4258___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Npcs.vue?vue&type=template&id=463c4258& */ "./resources/js/components/npcs/Npcs.vue?vue&type=template&id=463c4258&");
/* harmony import */ var _Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Npcs.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/Npcs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Npcs_vue_vue_type_template_id_463c4258___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Npcs_vue_vue_type_template_id_463c4258___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/Npcs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/Npcs.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/npcs/Npcs.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npcs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npcs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Npcs.vue?vue&type=template&id=463c4258&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/npcs/Npcs.vue?vue&type=template&id=463c4258& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npcs_vue_vue_type_template_id_463c4258___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Npcs.vue?vue&type=template&id=463c4258& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Npcs.vue?vue&type=template&id=463c4258&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npcs_vue_vue_type_template_id_463c4258___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Npcs_vue_vue_type_template_id_463c4258___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/npcs/Public_Npcs.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/npcs/Public_Npcs.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Public_Npcs_vue_vue_type_template_id_4848f1b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Public_Npcs.vue?vue&type=template&id=4848f1b6& */ "./resources/js/components/npcs/Public_Npcs.vue?vue&type=template&id=4848f1b6&");
/* harmony import */ var _Public_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Public_Npcs.vue?vue&type=script&lang=js& */ "./resources/js/components/npcs/Public_Npcs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Public_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Public_Npcs_vue_vue_type_template_id_4848f1b6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Public_Npcs_vue_vue_type_template_id_4848f1b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/npcs/Public_Npcs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/npcs/Public_Npcs.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/npcs/Public_Npcs.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Public_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Public_Npcs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Public_Npcs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Public_Npcs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/npcs/Public_Npcs.vue?vue&type=template&id=4848f1b6&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/npcs/Public_Npcs.vue?vue&type=template&id=4848f1b6& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Public_Npcs_vue_vue_type_template_id_4848f1b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Public_Npcs.vue?vue&type=template&id=4848f1b6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/npcs/Public_Npcs.vue?vue&type=template&id=4848f1b6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Public_Npcs_vue_vue_type_template_id_4848f1b6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Public_Npcs_vue_vue_type_template_id_4848f1b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/npcs.js":
/*!******************************!*\
  !*** ./resources/js/npcs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
Vue.config.productionTip = false;
Vue.component('auth', __webpack_require__(/*! ./components/auth/Auth.vue */ "./resources/js/components/auth/Auth.vue").default);
Vue.component('npcs', __webpack_require__(/*! ./components/npcs/Npcs.vue */ "./resources/js/components/npcs/Npcs.vue").default);
Vue.component('npc-generator', __webpack_require__(/*! ./components/npcs/Npc_generator.vue */ "./resources/js/components/npcs/Npc_generator.vue").default);
Vue.component('NPC_GEN_DATA', __webpack_require__(/*! ./components/npcs/NPC_GEN_DATA.vue */ "./resources/js/components/npcs/NPC_GEN_DATA.vue").default);
Vue.component('npc-view', __webpack_require__(/*! ./components/npcs/Npc_view.vue */ "./resources/js/components/npcs/Npc_view.vue").default);
Vue.component('npc-edit', __webpack_require__(/*! ./components/npcs/Npc_edit.vue */ "./resources/js/components/npcs/Npc_edit.vue").default);
Vue.component('my-npcs', __webpack_require__(/*! ./components/npcs/My_Npcs.vue */ "./resources/js/components/npcs/My_Npcs.vue").default);
Vue.component('public-npcs', __webpack_require__(/*! ./components/npcs/Public_Npcs.vue */ "./resources/js/components/npcs/Public_Npcs.vue").default); //Vue.component('npc-public-listview', require('./components/npcs/Npc_Public_Listview.vue').default);

Vue.component('npc-public-fullview', __webpack_require__(/*! ./components/npcs/Npc_Public_Fullview.vue */ "./resources/js/components/npcs/Npc_Public_Fullview.vue").default);
var app = new Vue({
  el: '#app'
});

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/npcs.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\dnd_companion\resources\js\npcs.js */"./resources/js/npcs.js");


/***/ })

},[[1,"/js/manifest","/js/vendor"]]]);