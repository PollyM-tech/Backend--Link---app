from flask import Blueprint, request, jsonify
from models import db, Link

#Creates a blueprint for link related routes
link_bp = Blueprint("link_bp", __name__)

# Route to add a new link
@link_bp.route("/links", methods=["POST"])
def add_link():
    data = request.get_json()
    new_link = Link(title=data["title"], url=data["url"])
    db.session.add(new_link)
    db.session.commit()
    return jsonify({"message": "Link saved successfully"}), 201

# Route to retrieve a single link by id
@link_bp.route("/links", methods=["GET"])
def get_links():
    links = Link.query.all()
    result = [{"id": link.id, "title": link.title, "url": link.url} for link in links]
    return jsonify(result), 200

@link_bp.route("/links/<int:id>", methods=["GET"])
def get_link(id):
    link = Link.query.get_or_404(id)
    return jsonify({"id": link.id, "title": link.title, "url": link.url}), 200

# route to deletes links by id 
@link_bp.route("/links/<int:id>", methods=["DELETE"])
def delete_link(id):
    link = Link.query.get_or_404(id)
    db.session.delete(link)
    db.session.commit()
    return jsonify({"message": "Link deleted successfully"}), 200
# route to updates links by id
@link_bp.route("/links/<int:id>", methods=["PUT"])
def update_link(id):
    data = request.get_json()
    link = Link.query.get_or_404(id)
    link.title = data.get("title", link.title)
    link.url = data.get("url", link.url)
    db.session.commit()
    return jsonify({"message": "Link updated successfully"}), 200
