from app.auth import auth_bp
from flask import render_template, request, redirect, url_for, flash
from flask_login import current_user, login_user, logout_user
from app.auth.forms import LoginForm, RegistrationForm
from app.auth.services import UserService

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard.index"))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = UserService.authenticate(form.email.data, form.password.data)

        if user:
            login_user(user, remember=form.remember_me.data)
            return redirect(url_for('dashboard.index'))
        else:
            flash("Invalid email or password.", "danger")
    
    return render_template('auth/login.html', title="Logim", form=form)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        try:
            UserService.create_user(
                username=form.username.data,
                email=form.email.data,
                password=form.password.data
            )
            flash('New account is created.', 'success')
            return redirect(url_for('auth.login'))
        except ValueError as e:
            flash(str(e), 'danger')
            
    return render_template('auth/register.html', title='Registration', form=form)

@auth_bp.route('/logout')
def logout():
    logout_user()
    flash('You are logged out.', 'info')
    return redirect(url_for('auth.login'))